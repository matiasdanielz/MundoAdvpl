#INCLUDE "TOTVS.ch"
#INCLUDE "TOPCONN.ch"


/*/{Protheus.doc} User Function QRY2ARR2
    Rotina auxiliar que converte o retorno da consulta, view, em uma matriz
    @type Function
    @author Everson da Costa Almeida
    @since 05/05/2022
    @param cQuery, charactere, string contendo o script da consulta
    @param lProcBar, logical, booleano informando se deseja ou não mostrar a regua de processamento
    @return array, Array contendo as informações oriundas da consulta
/*/
User Function Qry2Array(cQuery, lProcBar)
	Local aArea  := GetArea()

	Default lProcBar := .T.
	Default cQuery := ""


	Private _aArray := {}

	If IsBlind()
		//execução sem interface com o usuário, como schedules e jobs
		lShowProc := .F.
	Else
		If lProcBar
			lShowProc := .T.
		Else
			lShowProc := .F.
		Endif
	Endif

	If lShowProc
		MsAguarde({|| _Execute(cQuery, lShowProc)}, "Aguarde... ", "Iniciando consulta... " )
	Else
		_Execute(cQuery, lProcBar)
	Endif

	RestArea(aArea)
Return _aArray


Static Function _Execute(cQuery, lShowProc)
	Local aLine     := {}
	Local nCounter 	:= 0
	Local cNextAlias:= ""
	Local nCampo    := 0

	Default lShowProc := .T.
	Default cQuery := ""


	// Executa a query para saber quais os campos retornados.
	cQuery := ChangeQuery(cQuery)
	cNextAlias := MpSysOpenQuery( cQuery )
	(cNextAlias)->(DbGoTop())

	If lShowProc
		MsProcTxt("Iniciando tratamento de campos...")
	Endif

	SX3->(DbSetOrder(2))
	For nCampo = 1 To (cNextAlias)->(FCount())
		If SX3->(MsSeek(Padr(AllTrim((cNextAlias)->(FieldName(nCampo))), 10, " ")))
			If SX3->X3_TIPO $ "ND"  // Numerico ou data
				TCSetField(cNextAlias, SX3->X3_CAMPO, SX3->X3_TIPO, SX3->X3_TAMANHO, SX3->X3_DECIMAL)
			Endif
		Endif

		If lShowProc
			MsProcTxt("Finalizando tratamento de campos...")
		Endif
	Next

	If lShowProc
		MsProcTxt("Processando consulta...")
	Endif

	(cNextAlias)->(DbGoTop())
	While !(cNextAlias)->(EoF())
		aLine = {}
		nCounter++
		
		For nCampo = 1 To (cNextAlias)->(FCount())
			AADD(aLine, (cNextAlias)->(FieldGet(nCampo)))
		Next

		AADD(_aArray, aClone(aLine))

		(cNextAlias)->(DbSkip())


		If lShowProc
			MsProcTxt("Processando linha: " + CValToChar(nCounter))
		Endif
	End

	(cNextAlias)->(DbCloseArea())
Return _aArray

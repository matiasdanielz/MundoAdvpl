#include 'protheus.ch'
#include 'topconn.ch'
#Include "Totvs.ch"
#Include "parmtype.ch"
#Include "tbiconn.ch"

class SalesModel from longclassname
    method New() CONSTRUCTOR
    method GetSalesOrder()
endclass

method New() class SalesModel
    return self

method GetSalesOrder() class SalesModel
    local oSaleOrd := JsonObject():New()
    local aSalesOrder := {}
    local a2SalesOrder := {}
    local nIndex := 0
    local nSalesLen := 0

    aSalesOrder := fConsulta(.f., 0)

    nSalesLen := len(aSalesOrder)

    for nIndex := 1 to nSalesLen
        oSaleOrd[ 'nf' ]           := aSalesOrder[nIndex][1]
        oSaleOrd[ 'pd' ]           := aSalesOrder[nIndex][2]
        oSaleOrd[ 'order' ]        := aSalesOrder[nIndex][3]
        oSaleOrd[ 'client' ]       := aSalesOrder[nIndex][4]
        oSaleOrd[ 'store' ]        := aSalesOrder[nIndex][5]
        oSaleOrd[ 'name' ]         := aSalesOrder[nIndex][6]
        oSaleOrd[ 'emissionDate' ] := aSalesOrder[nIndex][7]
        oSaleOrd[ 'document' ]     := aSalesOrder[nIndex][8]
        oSaleOrd[ 'serialNumber' ] := aSalesOrder[nIndex][9]

        aadd(a2SalesOrder, oSaleOrd)
        oSaleOrd := JsonObject():New()
    next

    return a2SalesOrder

Static Function fConsulta(lFiltro,nTpFiltro)
	Local cQuery  	:= ""
	Local aParam 	:= {}
	Local aPerg  	:= {}
	Local aRet 		:= {}
	Local lRet 		:= .F.


	cQuery := " SELECT DISTINCT(C5_NUM), CASE " + CRLF
	cQuery += "				WHEN F2_FIMP = ' ' AND F2_ESPECIE ='SPED' THEN '0'  " + CRLF
	cQuery += "				WHEN F2_FIMP = 'S'						  THEN '1'  " + CRLF
	cQuery += "				WHEN F2_FIMP = 'T'						  THEN '2'  " + CRLF
	cQuery += "				WHEN F2_FIMP = 'D'						  THEN '3'  " + CRLF
	cQuery += "				WHEN F2_FIMP = 'N'						  THEN '4'  " + CRLF
	cQuery += "				ELSE 'A' " + CRLF
	cQuery += "			 END AS LEGNF ," + CRLF
	cQuery += " 						   CASE " + CRLF
	cQuery += "				WHEN (C5_LIBEROK     = '' AND  C5_NOTA    = ''   AND C5_BLQ = '')  THEN '5'  " + CRLF
	cQuery += "				WHEN (C5_NOTA       <> '' OR   C5_LIBEROK = 'E'  AND C5_BLQ = '')  THEN '6'  " + CRLF
	cQuery += "				WHEN (C5_LIBEROK    <> '' AND  C5_NOTA    = ''   AND C5_BLQ = '')  THEN '7'  " + CRLF
	cQuery += "				WHEN (C5_BLQ = '1') THEN '8'  " + CRLF
	cQuery += "				WHEN (C5_BLQ = '2') THEN '9'  " + CRLF
	cQuery += "				ELSE 'A' " + CRLF
	cQuery += "			 END AS LEGPD " + CRLF
	cQuery += ",C5_CLIENTE,C5_LOJACLI,C5_TIPO,C5_EMISSAO,F2_DOC,F2_SERIE	" + CRLF
	cQuery += "FROM  " + RetSqlName("SC5") + " SC5 " + CRLF
	cQuery += "LEFT JOIN " + RetSqlName("SD2") + " SD2  ON SD2.D_E_L_E_T_ <> '*' AND D2_FILIAL = C5_FILIAL AND D2_PEDIDO = C5_NUM  " + CRLF
	cQuery += "LEFT JOIN " + RetSqlName("SF2") + " SF2  ON SF2.D_E_L_E_T_ <> '*' AND D2_FILIAL = D2_FILIAL AND F2_DOC    = D2_DOC  " + CRLF
	cQuery += "WHERE SC5.D_E_L_E_T_ <> '*' " + CRLF
	cQuery += "AND SC5.C5_FILIAL = '" + xFilial("SC5") + "' " + CRLF

	If lFiltro
		If nTpFiltro == 0
			AADD(aPerg, {01, 'Pedido'        , Space(TamSX3('C5_NUM')[1])    , '@!', '.T.', 'SC5', '.T.', 100, .F.})
			AADD(aPerg, {01, 'Data Inicial'  , CtoD(""), , '.T.', ''   , '.T.', 100, .F.})
			AADD(aPerg, {01, 'Data Final  '  , CtoD(""), , '.T.', ''   , '.T.', 100, .F.})
			AADD(aPerg, {01, 'Cliente'       , Space(TamSX3('A1_COD')[1])    , '@!', '.T.', 'SA1', '.T.', 100, .F.})
			AADD(aPerg, {01, 'Loja'          , Space(TamSX3('A1_LOJA')[1])    , '@!', '.T.', '', '.T.', 100, .F.})

			If Parambox(aPerg, "Filtro Pedidos", @aParam, , , , , , , , .T.)
				lRet 		:= .T.
				If !Empty(aParam[1])
					cQuery += "AND SC5.C5_NUM = '" + aParam[1] + "' " + CRLF
				EndIf
				If !Empty(aParam[3])
					_cParIni := DtoS(aParam[2])
					cQuery += "AND SC5.C5_EMISSAO >= '" + DtoS(aParam[2]) + "' " + CRLF
					If !Empty(aParam[3])
						_cParFim := DtoS(aParam[3])
						cQuery += "AND SC5.C5_EMISSAO <= '" + DtoS(aParam[3]) + "' " + CRLF
					EndIf
				EndIf
				If !Empty(aParam[4])
					cQuery += "AND SC5.C5_CLIENTE = '" + aParam[4] + "' " + CRLF
					cQuery += "AND SC5.C5_LOJACLI = '" + aParam[5] + "' " + CRLF
				EndIf
			Else
				MsgInfo("Sem Filtro - Retornando para valores iniciais.")
				cQuery += "AND SC5.C5_EMISSAO >= '" + DtoS(Date()-90) + "' "
			EndIf
		Else
			If !Empty(_cParIni)
				cQuery += "AND SC5.C5_EMISSAO >= '" + _cParIni + "' " + CRLF
			Else
				cQuery += "AND SC5.C5_EMISSAO >= '" + DtoS(Date()-90) + "' " + CRLF
			EndIf
			If !Empty(_cParIni)
				cQuery += "AND SC5.C5_EMISSAO <= '" + _cParIni + "' " + CRLF
			EndIf
		EndIf
	Else
		cQuery += "AND SC5.C5_EMISSAO >= '" + DtoS(Date()-90) + "' " + CRLF
	EndIf

	cQuery += "ORDER BY C5_NUM " + CRLF

	MemoWrite("C:\Temp\Teste_SC5.txt",cQuery)
	aRet :=  U_Qry2Array(cQuery)
	If Len(aRet) <= 0
		aRet := {}
		AADD(aRet,{"","","","","","",CtoD(""),"",""})
	EndIf
Return aRet

Static Function fBusNome(nTipo)

	Local cNome := ""
	If !Empty(_aPedidos[_oBrw:nAt,04])
		If nTipo == 1
			SA1->(dbSetOrder(1))
			SA1->(MsSeek(xFilial("SA1")+_aPedidos[_oBrw:nAt,04]+_aPedidos[_oBrw:nAt,05]))
			cNome := SA1->A1_NOME
		Else
			SA2->(dbSetOrder(1))
			SA2->(MsSeek(xFilial("SA2")+_aPedidos[_oBrw:nAt,04]+_aPedidos[_oBrw:nAt,05]))
			cNome := SA2->A2_NOME
		EndIf
	EndIf

Return cNome

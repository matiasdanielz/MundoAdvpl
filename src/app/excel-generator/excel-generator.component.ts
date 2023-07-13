import { Component, OnInit, ViewChild,  } from '@angular/core';
import { PoDisclaimer, PoNotification, PoNotificationService } from '@po-ui/ng-components';


@Component({
  selector: 'app-excel-generator',
  templateUrl: './excel-generator.component.html',
  styleUrls: ['./excel-generator.component.css']
})
export class ExcelGeneratorComponent implements OnInit {
  @ViewChild("codeEditor", {static: true}) codeEditor: any;

  public isOOGenerator: boolean = true;
  public generatorContent: string = "";
  public tableToGenerate: string = "";

  public fieldTitle: string = '';
  public filedsTitles: Array<string> = []; 

  public disclaimer!: PoDisclaimer;
  public disclaimers: Array<PoDisclaimer> = [{ value: 'disclaimer' }];

  public event: string = '';

  public windowHeight: string = (window.innerHeight - window.innerHeight / 2).toString();

  ngOnInit(): void {
    this.restore();
  }

  constructor(private poNotification: PoNotificationService){

  }

  public addDisclaimer() {
    if(this.disclaimer.value == undefined || this.fieldTitle == "" || this.tableToGenerate == ""){
      this.poNotification.error("Preencha os campos obrigatorios")
      return;
    }

    this.disclaimer.label = this.fieldTitle;

    this.disclaimers = [...this.disclaimers, this.disclaimer];
    this.filedsTitles.push(this.fieldTitle);

    this.disclaimer = { value: undefined };
    this.fieldTitle = "";

    if(this.isOOGenerator){
      this.modifyOOGenerator();
    }
    else{
      this.modifyProceduralGenerator();
    }
  }

  public changeEvent(event: string) {
    this.event = event;
  }

  public restore() {
    this.disclaimer = { value: undefined };
    this.disclaimers = [];

    this.event = '';
  }

  public modifyOOGenerator(){
    //Add Structure
    this.generatorContent = "user function callOOExcel()"

    + "\n   ExcelController():GenerateExcel()"

    + "\nreturn"

    + "\n\nclass ExcelController"
    + "\n    static method GenerateExcel()"
    + "\nendclass"

    + "\n\nstatic method GenerateExcel() class ExcelController"  
    + "\n   local oExcel := JsonObject():New()"
    + '\n   local cHeader := ""\n'

    this.disclaimers.forEach(item => {
      this.generatorContent += '\n   cHeader += "' + item.label + '"'
    })

    this.generatorContent += "\n\n   oExcel := ExcelModel():New()"
    + "\n   oExcel:SetHeader(cHeader)"

    + "\n\n   if oExcel:DirExist()"
    + "\n       oExcel:SetContentInExcel()"
    + "\n   else"
    + "\n       oExcel:CreateDir()"
    + "\n       oExcel:SetContentInExcel()"
    + "\n   endif"

    + "\n\n   return"

    + "\n\nclass ExcelModel"
    + "\n   data cHeader"
    + "\n   data cTxtCont"
    + "\n   data cFilePath"
    + "\n   data cDir"
    
    + "\n\n   method New() CONSTRUCTOR"
    + "\n   method SetHeader()"
    + "\n   method CreateExcel()"
    + "\n   method DirExist()"
    + "\n   method CreateDir()"
    + "\n   method SetContentInExcel()"
    + "\nendclass"

    + "\n\nmethod New() class ExcelModel"
    + '\n    ::cDir      := "C:/EXCEL"'
    + '\n    ::cFilePath := "C:/EXCEL/excel.CSV"'
    + '\n    return self'

    + '\n\nmethod SetHeader(cHeader) class ExcelModel'
    + '\n    ::cHeader := cHeader'
    + '\n    ::cTxtCont  := ::cHeader'
    + '\n    return self'

    + '\n\nmethod DirExist() class ExcelModel'
    + '\n    local bDirExist'

    + '\n\n    bDirExist := lIsDir( ::cDir )'

    + '\n\n    return bDirExist'

    + '\n\nmethod CreateDir() class ExcelModel'

    + '\n    if MakeDir( ::cDir ) <> 0'
    + '\n        MsgStop("Ocorreu erro ao tentar criar o diretório: "+ ::cDir)'
    + '\n    endif'

    + '\n\n   return'

    + '\n\nmethod SetContentInExcel() class ExcelModel'
    + '\n    local cBreakLin := Chr(13) + Chr(10)'

    + '\n\n    BeginSQL Alias "SQL_YOURALIAS"'
    + '\n        SELECT'

    //Add BEGINSQL FIELDS
    this.disclaimers.forEach(item => {
      this.generatorContent += '\n            ' + item.value + ' '
    })

    //Add Beginsql Table
    this.generatorContent += '\n        FROM '
    + '\n            ' + this.tableToGenerate + ' '
    + '\n    ENDSQL'

    + '\n\n    While !SQL_YOURALIAS->(Eof())'

    //Add while fileds
    this.disclaimers.forEach(item => {
      this.generatorContent += '\n        ::cTxtCont += cBreakLin + SQL_YOURALIAS->' + item.value + ' '
    })

    //Add the remaining content
    this.generatorContent += '\n        SQL_YOURALIAS->(DbSkip())'
    + '\n    Enddo'

    + '\n\n    SQL_YOURALIAS->(DbCloseArea())'

    + '\n\n    Memowrite(::cFilePath, ::cTxtCont)'

    + '\n\n    alert("Arquivo gerado")'

    + '\n\n    return'
  }

  public modifyProceduralGenerator(){
    this.generatorContent = 'USER FUNCTION GerarExcel()'
    + '\n    local cBreakLin := Chr(13) + Chr(10)'
    + '\n    local cTxtPath  := "C:/EXCEL/excel.CSV"'
    + '\n    local cTxtCont  := ""'
    + '\n    local cDir := "C:/EXCEL"'
    + '\n    local cHeader   := ""\n'

    this.disclaimers.forEach(item => {
      this.generatorContent += '\n    cHeader += "' + item.label + '"'
    })

    this.generatorContent += '\n\n    cTxtCont := cHeader'

    + '\n\n    BeginSQL Alias "SQL_YOURALIAS"'
    + '\n         SELECT'
    this.disclaimers.forEach(item => {
      this.generatorContent += '\n             ' + item.value + ' '
    })

    this.generatorContent += '\n         FROM '

    this.generatorContent += '\n             ' + this.tableToGenerate + ' '

    this.generatorContent += '\n    ENDSQL'

    + '\n\n    While !SQL_YOURALIAS->(Eof())'

    this.disclaimers.forEach(item => {
      this.generatorContent += '\n         cTxtCont += cBreakLin + SQL_YOURALIAS->' + item.value + ' '
    })

    this.generatorContent += '\n         SQL_YOURALIAS->(DbSkip())'
    + '\n    Enddo'

    + '\n\n    SQL_YOURALIAS->(DbCloseArea())'

    + '\n\n    Memowrite(cTxtPath, cTxtCont)'

    + '\n\n    if !lIsDir( cDir )'
    + '\n         if MakeDir( cDir ) <> 0'
    + '\n           MsgStop("Ocorreu erro ao tentar criar o diretório: "+cDir)'
    + '\n           lExistDir := .F.'
    + '\n           return'
    + '\n         endif'
    + '\n    Endif'

    + '\n\n    return'
  }
}
function Viewchild(): (target: ExcelGeneratorComponent, propertyKey: "isOOGenerator") => void {
  throw new Error('Function not implemented.');
}


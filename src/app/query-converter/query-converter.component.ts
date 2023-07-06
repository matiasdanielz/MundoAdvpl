import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-query-converter',
  templateUrl: './query-converter.component.html',
  styleUrls: ['./query-converter.component.css']
})
export class QueryConverterComponent implements OnInit{
  @ViewChild('queryTypeSelect', {static: true}) queryTypeSelect: any;

  public queryRequest: String = '';
  public queryResponse: String = '';

  readonly queryOptions = [
    { label: 'Tcquery', value: 1 },
    { label: 'BeginSql', value: 2 }
  ];

  constructor() {}

  ngOnInit(): void {
    this.queryTypeSelect.selectedValue = 1;
    this.queryTypeSelect.displayValue = "Tcquery";
  }

  public convertSqlToTcQuery(): string {
    const formattedSql = this.queryRequest.replace(/\n/g, ' ').trim().toUpperCase();
    const lines = formattedSql.split(/\s+(?=FROM|WHERE|GROUP BY|HAVING|ORDER BY|INNER|JOIN|RIGHT|LEFT)/i);
  
    let tcQuery = '';
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const fields = line.split(",");
      for (let j = 0; j < fields.length; j++) {
        const field = fields[j].trim();
        if (j === 0) {
          tcQuery += 'cQuery += "' + field + '"';
        } else {
          tcQuery += 'cQuery += "' + field + '",';
        }
        tcQuery += '\n';
      }
    }
  
    this.queryResponse = tcQuery;
  
    return tcQuery;
  }

  public convertSqlToBeginSql(): string {
    const formattedSql = this.queryRequest.replace(/\n/g, ' ').trim().toUpperCase();
    const lines = formattedSql.split(/\s+(?=FROM|WHERE|GROUP BY|HAVING|ORDER BY|INNER|JOIN|RIGHT|LEFT)/i);
  
    let beginSql = "BEGINSQL\n";
  
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
  
      if (line.startsWith("SELECT ")) {
        const selectFields = line.substring(7).split(",");
        const lastField = selectFields[selectFields.length - 1].trim();
  
        beginSql += "  SELECT\n";
        for (let j = 0; j < selectFields.length; j++) {
          const field = selectFields[j].trim();
          beginSql += "    " + field + (field !== lastField ? "," : "") + "\n";
        }
      } else if (line.startsWith("FROM ")) {
        const fromClause = line.substring(5);
        beginSql += "  FROM\n";
        beginSql += "    " + fromClause + "\n";
      } else if (line.includes("JOIN ")) {
        beginSql += "    " + line + "\n";
      } else if (line.startsWith("WHERE ")) {
        beginSql += "  WHERE\n";
        beginSql += "    " + line.substring(6) + "\n";
      } else if (line.startsWith("GROUP BY ")) {
        beginSql += "  GROUP BY\n";
        beginSql += "    " + line.substring(9) + "\n";
      } else if (line.startsWith("HAVING ")) {
        beginSql += "  HAVING\n";
        beginSql += "    " + line.substring(7) + "\n";
      } else if (line.startsWith("ORDER BY ")) {
        beginSql += "  ORDER BY\n";
        beginSql += "    " + line.substring(9) + "\n";
      }
    }
  
    beginSql += "ENDSQL";
  
    this.queryResponse = beginSql;
  
    return beginSql;
  }

}

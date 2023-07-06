#include 'protheus.ch'
#include 'topconn.ch'
#Include "Totvs.ch"
#Include "parmtype.ch"
#Include "tbiconn.ch"

class SalesController from longclassname
    static method GetSalesOrders()
endclass

static method GetSalesOrders() class SalesController
    local jResponse := JsonObject():New()
    local oSalesModel := JsonObject():New()

    oSalesModel := SalesModel():New()
    jResponse := oSalesModel:GetSalesOrders()

    if jResponse == nil
        jResponse['responseCode'] := "404"
        jResponse['response'] := "No sales order has been found"
    endif

    return jResponse

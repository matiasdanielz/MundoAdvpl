#include 'Totvs.ch'
#include 'RestFul.ch'

WSRESTFUL Smartfat Description "Chatbot"
    WSMETHOD GET salesOrder Description "Returns list of all sales order" WSSYNTAX "/sales/salesOrder" PATH "/sales/salesOrder"
END WSRESTFUL

WSMETHOD GET salesOrder WSSERVICE Smartfat
    local jResponse := JsonObject():New()

    self:SetContentType('application/json')

    jResponse := SalesController():GetSalesOrders()

    self:setresponse(jResponse)
    return .t.

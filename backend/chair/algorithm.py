

while True:
    savings = int(input("savings"))
    monthly = int(input("monthly"))
    bills = int(input("bills per month"))
    cost = int(input("cost"))
    payDay = int(input("days until next pay")) #days until next payday
    score = 0

    a = savings/(cost*1.1)

    if cost > savings:
          score = 0
    else:

        #score += ((monthly - bills)/(max(1,(pow(a,1.5))*1.2))/cost)*(700/payDay)
        score += (4400*(monthly-bills))/(a*pow(cost,1.1)*pow(payDay,0.8)) + (70*savings)/(cost*1.1)
        #score = (4840*monthly)/(savings*pow(payDay,0.8)*pow(cost,0.1)) + (70*savings) / (cost*1.1)
        '''
        **Works, but has problems with larger numbers**
        
        monthly - how much they make per month
        bills - how much they pay for expenses per month
        savings - disposable income
        payDay - #days until they get paid
        cost - how much the item costs


        '''

    score = round(score/100,2)
    if score > 10:
        score = 9.99

    print(score)



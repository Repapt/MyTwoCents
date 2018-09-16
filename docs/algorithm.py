
def getScore(savings, monthly, bills, cost, payDay):
    score = 0
    if cost > savings:
        score = 0
    elif savings < 1000:
        score = savings/pow(cost,1.1)
    else:
        a = savings/(cost*1.1)
        score += (1300*(monthly-bills))/(max(1,a)*pow(cost,1.1)*pow(payDay,0.8)) + (30*savings)/(pow(cost,1.1))

    score = round(score/100,2)
    if score > 10:
        score = 9.99
    return score
'''
while True:
    savings = int(input("savings"))
    monthly = int(input("monthly"))
    bills = int(input("bills per month"))
    cost = int(input("cost"))
    payDay = int(input("days until next pay")) #days until next payday
    print(getScore(savings, monthly, bills, cost, payDay))

        #score += ((monthly - bills)/(max(1,(pow(a,1.5))*1.2))/cost)*(700/payDay)
        #score = (4840*monthly)/(savings*pow(payDay,0.8)*pow(cost,0.1)) + (70*savings) / (cost*1.1)
'''

        



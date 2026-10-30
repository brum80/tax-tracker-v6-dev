/* Tax Tracker V6 development: illustrative 2026/27 England, not filing calculations. */
(function(root){
'use strict';
const round=p=>Math.round((p+Number.EPSILON)*100)/100;
const n=x=>Number(x)||0;
const rules={2026:{allowance:12570,taperStart:100000,basicBand:37700,additionalThreshold:125140,class4Lower:12570,class4Upper:50270,lowMileage:.55,highMileage:.25},2025:{allowance:12570,taperStart:100000,basicBand:37700,additionalThreshold:125140,class4Lower:12570,class4Upper:50270,lowMileage:.45,highMileage:.25}};
function getRules(year){if(!rules[year])throw Error('Tax calculations unavailable for '+year+'/'+String((year+1)%100).padStart(2,'0')+'; tax-year rates must be verified.');return rules[year]}
function mileage(miles,year){const r=getRules(year);miles=Math.max(0,n(miles));return round(Math.min(miles,10000)*r.lowMileage+Math.max(0,miles-10000)*r.highMileage)}
function tax(profit,year,opts={}){if(year!==2026)throw Error('2026/27 is the only verified calculator year in this development build');const r=getRules(year),p=Math.max(0,n(profit)),adjustedNetIncome=Math.max(0,p+n(opts.otherIncome)-n(opts.aniRelief)),allowance=Math.max(0,round(r.allowance-Math.max(0,adjustedNetIncome-r.taperStart)/2)),taxable=Math.max(0,p-allowance),basic=Math.min(taxable,r.basicBand),higher=Math.min(Math.max(0,taxable-r.basicBand),r.additionalThreshold-r.basicBand),additional=Math.max(0,taxable-r.basicBand-higher),incomeTax=round(basic*.2+higher*.4+additional*.45),class4=round(Math.max(0,Math.min(p,r.class4Upper)-r.class4Lower)*.06+Math.max(0,p-r.class4Upper)*.02);return {profit:round(p),allowance,taxable:round(taxable),incomeTax,class4,totalTax:round(incomeTax+class4),adjustedNetIncome:round(adjustedNetIncome),rates:r}}
function summary(payments,expenses,year,opts={}){
 const p=payments.filter(x=>inYear(x.date,year)),e=expenses.filter(x=>inYear(x.date,year));
 const net=round(p.reduce((s,x)=>s+n(x.net),0)),cis=round(p.reduce((s,x)=>s+n(x.cis),0)),turnover=round(net+cis),miles=p.reduce((s,x)=>s+n(x.miles),0),mileageCost=mileage(miles,year);
 const paid=round(e.reduce((s,x)=>s+n(x.amount),0)),allowable=round(e.reduce((s,x)=>s+round(n(x.amount)*(x.businessUsePercent===undefined?100:n(x.businessUsePercent))/100),0));
 const profit=round(turnover-allowable-mileageCost),result=tax(profit,year,opts),otherCredits=round(n(opts.otherCredits)),paymentsOnAccount=round(n(opts.paymentsOnAccount)),adjustments=round(n(opts.adjustments)),balance=round(result.totalTax+adjustments-cis-otherCredits-paymentsOnAccount);
 return {...result,p,e,net,cis,turnover,miles,mileageCost,paid,allowable,profit,balance,otherCredits,paymentsOnAccount,adjustments};
}
function forecast(base,year,{weeks=0,weeklyNet=0,weeklyCis=0,extraMiles=0,extraExpenses=0,...opts}={}){
 const projectedTurnover=round(base.turnover+n(weeks)*(n(weeklyNet)+n(weeklyCis))),projectedCis=round(base.cis+n(weeks)*n(weeklyCis)),projectedMiles=base.miles+n(extraMiles),projectedMileage=mileage(projectedMiles,year),projectedExpenses=round(base.allowable+n(extraExpenses)),profit=round(projectedTurnover-projectedMileage-projectedExpenses),t=tax(profit,year,opts);
 return {...t,turnover:projectedTurnover,cis:projectedCis,miles:projectedMiles,mileageCost:projectedMileage,allowable:projectedExpenses,balance:round(t.totalTax+n(opts.adjustments)-projectedCis-n(opts.otherCredits)-n(opts.paymentsOnAccount))};
}
function inYear(date,year){return typeof date==='string'&&date>=`${year}-04-06`&&date<=`${year+1}-04-05`}
function payment(net,type,{retentionRate=5,cisRate=20}={}){net=n(net);const heldRate=type==='normal'?n(retentionRate)/100:0,rate=n(cisRate)/100;if(!['normal','bonus','retention'].includes(type)||net<0||heldRate<0||heldRate>=1||rate<0||rate>=1)throw Error('Invalid payment settings');const gross=round(net/((1-heldRate)*(1-rate))),held=round(gross*heldRate),cis=round((gross-held)*rate);return {gross,held,cis,turnover:round(net+cis),retentionRate:type==='normal'?n(retentionRate):0,cisRate:n(cisRate)}}
root.TaxEngine={round,getRules,mileage,tax,summary,forecast,payment,inYear};
})(typeof window!=='undefined'?window:globalThis);

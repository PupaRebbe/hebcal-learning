import {greg, months, HDate} from '@hebcal/core';
function getPirkeiAvot(dt, il){
    const hd = new HDate(dt);
    if (!greg.isDate(dt)) throw new TypeError(`Argument not a Date: ${dt}`);
    if(hd.getDay() < 6) throw new TypeError("Date must be Saturday");
    const shvi = new core.HDate(21, months.NISAN, hd.getFullYear());
    const diff = shvi.deltaDays(hd);
    if(diff <0){
        const first = shvi.after(6);
        var weekDiff = Math.ceil(hd.deltaDays(first) / 7);
        var chapter = 1;
        var holObj = {}; //when a Holiday falls on Saturday, Pirkei avot is not studied
        if(!il) {
            holObj.Achron = shvi.next();
            holObj.Shavuot = new HDate(7, core.months.SIVAN, hd.getFullYear());
        }
        holObj.Erev = new HDate(8, core.months.AV, hd.getFullYear());
        holObj.Tb = holObj.Erev.next();
        for (const [hol, day] of Object.entries(holObj)) {
            if(day.deltaDays(hd) <=0){
                if(day.isSameDate(hd)){
                    chapter = undefined;
                    break;
                }
                if(day.getDay() == 6) weekDiff -= 1;
            }        
        }
        if(!chapter) return chapter;
        if(weekDiff >= 18){ //fourth round
            const rh = new HDate(1, core.months.TISHREI, hd.getFullYear() +1);
            const last = rh.before(6);
            var result;
            const weeksRemain = Math.ceil(last.deltaDays(hd) / 7);
            switch(weeksRemain){
                case 0:
                    result = [5, 6];
                    break;
                case 1:
                    result = [3, 4];
                    break;
                case 2:
                    result = (weekDiff % 6 == 1) ? [2] : [1, 2];
                    break;
                case 3:
                    result = [1];
                    break;        
            }
            return result;
        }
        chapter += weekDiff % 6;
        return [chapter]
    }
}


export default {
    roundToFirst(num) {
        if (num >= 1) {
            const power = Math.pow(10, (Math.round(num) + '').length - 1);
            return Math.round(num/power)*power;
        } else if (num > 0)
            return +num.toFixed((num + '').match(/^0\.0*/)[0].length - 1);
        else
            return num;
    },
};

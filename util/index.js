export default {
    roundToFirst(num) {
        const power = Math.pow(10, (Math.round(num) + '').length - 1);
        return Math.round(num/power)*power;
    },
};

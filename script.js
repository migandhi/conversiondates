document.addEventListener('DOMContentLoaded', function() {
    var convertToHijriButton = document.getElementById('convert-to-hijri-btn');
    var convertToGregorianButton = document.getElementById('convert-to-gregorian-btn');

    if (!convertToHijriButton || !convertToGregorianButton) {
        console.error("Convert buttons not found!");
        return;
    }

    convertToHijriButton.addEventListener('click', function() {
        var gregorianYearElement = document.getElementById('gregorian-year');
        var gregorianMonthElement = document.getElementById('gregorian-month');
        var gregorianDayElement = document.getElementById('gregorian-day');

        if (!gregorianYearElement || !gregorianMonthElement || !gregorianDayElement) {
            console.error("One or more input fields are missing!");
            return;
        }

        var gregorianYearValue = gregorianYearElement.value || gregorianYearElement.textContent || '';
        var gregorianMonthValue = gregorianMonthElement.value || gregorianMonthElement.textContent || '';
        var gregorianDayValue = gregorianDayElement.value || gregorianDayElement.textContent || '';

        gregorianYearValue = gregorianYearValue.trim();
        gregorianMonthValue = gregorianMonthValue.trim();
        gregorianDayValue = gregorianDayValue.trim();

        if (gregorianYearValue === '' || gregorianMonthValue === '' || gregorianDayValue === '') {
            document.getElementById('result').textContent = "All fields must be filled for Gregorian to Hijri.";
            return;
        }

        var gregorianYear = parseInt(gregorianYearValue);
        var gregorianMonth = parseInt(gregorianMonthValue);
        var gregorianDay = parseInt(gregorianDayValue);

        if (isNaN(gregorianYear) || isNaN(gregorianMonth) || isNaN(gregorianDay)) {
            document.getElementById('result').textContent = "Invalid input: Please enter valid numbers.";
            return;
        }

        var gregorianDate = new Date(gregorianYear, gregorianMonth, gregorianDay);
        var hijriDate = HijriDate.fromAJD(HijriDate.gregorianToAJD(gregorianDate));

        var hijriDaysOfWeek = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        var gregorianDayOfWeek = gregorianDate.getDay();
        document.getElementById('result').textContent = `Gregorian Date: ${gregorianDate.toDateString()} (${hijriDaysOfWeek[gregorianDayOfWeek]})\n` +
            `Hijri Date: ${hijriDate.getDate()} ${HijriDate.getMonthName(hijriDate.getMonth())} ${hijriDate.getYear()}`;
    });

    convertToGregorianButton.addEventListener('click', function() {
        var hijriYearElement = document.getElementById('hijri-year');
        var hijriMonthElement = document.getElementById('hijri-month');
        var hijriDayElement = document.getElementById('hijri-day');

        if (!hijriYearElement || !hijriMonthElement || !hijriDayElement) {
            console.error("One or more input fields are missing!");
            return;
        }

        var hijriYearValue = hijriYearElement.value || hijriYearElement.textContent || '';
        var hijriMonthValue = hijriMonthElement.value || hijriMonthElement.textContent || '';
        var hijriDayValue = hijriDayElement.value || hijriDayElement.textContent || '';

        hijriYearValue = hijriYearValue.trim();
        hijriMonthValue = hijriMonthValue.trim();
        hijriDayValue = hijriDayValue.trim();

        if (hijriYearValue === '' || hijriMonthValue === '' || hijriDayValue === '') {
            document.getElementById('result').textContent = "All fields must be filled for Hijri to Gregorian.";
            return;
        }

        var hijriYear = parseInt(hijriYearValue);
        var hijriMonth = parseInt(hijriMonthValue);
        var hijriDay = parseInt(hijriDayValue);

        if (isNaN(hijriYear) || isNaN(hijriMonth) || isNaN(hijriDay)) {
            document.getElementById('result').textContent = "Invalid input: Please enter valid numbers.";
            return;
        }

        var hijriDate = new HijriDate(hijriYear, hijriMonth, hijriDay);
        var gregorianDate = hijriDate.toGregorian();

        var gregorianDaysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var gregorianDayOfWeek = gregorianDate.getDay();
        document.getElementById('result').textContent = `Hijri Date: ${hijriDate.getDate()} ${HijriDate.getMonthName(hijriDate.getMonth())} ${hijriDate.getYear()}\n` +
            `Gregorian Date: ${gregorianDate.toDateString()} (${gregorianDaysOfWeek[gregorianDayOfWeek]})`;
    });
});

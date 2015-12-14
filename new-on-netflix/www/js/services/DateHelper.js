angular.module('newOnNetflix.services')
  .factory('DateHelper', function () {
    function getMonthAndYearByIndex (monthIndex) {
      var month = [];
      month[0] = "January";
      month[1] = "February";
      month[2] = "March";
      month[3] = "April";
      month[4] = "May";
      month[5] = "June";
      month[6] = "July";
      month[7] = "August";
      month[8] = "September";
      month[9] = "October";
      month[10] = "November";
      month[11] = "December";
      return {
        month: month[monthIndex],
        year: getYearOfMonth(monthIndex)
      };
    }

    function getCurrentMonthIndex () {
      return new Date().getMonth();
    }

    function getNextMonthIndex () {
      var currentMonthIndex = getCurrentMonthIndex();
      return currentMonthIndex === 11 ? 0 : (currentMonthIndex + 1);
    }

    function getPreviousMonthIndex () {
      var currentMonthIndex = getCurrentMonthIndex();
      return currentMonthIndex === 0 ? 11 : (currentMonthIndex - 1);
    }

    function getCurrentMonth () {
      return getMonthAndYearByIndex(getCurrentMonthIndex());
    }

    function getNextMonth () {
      return getMonthAndYearByIndex(getNextMonthIndex());
    }

    function getPreviousMonth () {
      return getMonthAndYearByIndex(getPreviousMonthIndex())
    }

    function getCurrentYear () {
      return new Date().getFullYear();
    }

    function getYearOfMonth (monthIndex) {
      var currentYear = getCurrentYear();

      if (monthIndex === getPreviousMonthIndex() && getCurrentMonthIndex() === 0) {
        return currentYear - 1;
      }
      if (monthIndex === getNextMonthIndex() && getCurrentMonthIndex() === 11) {
        return currentYear + 1;
      }

      return currentYear;
    }

    return {
      getCurrentMonth: getCurrentMonth,
      getPreviousMonth: getPreviousMonth,
      getNextMonth: getNextMonth,
      getYear: getCurrentYear
    }
  });


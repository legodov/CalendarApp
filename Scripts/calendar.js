/* Calendar */
class Calendar {
  constructor(element, locale, callback) {
    this.element = element;
    this.locale = locale;
    this.callback = callback;
    moment.locale(locale);
    this.show(moment().year());
  }

  show(year) {
    this.year = year;
    var m, d1, t = [],
      y = '',
      w = 0,
      r = 0,
      n = _.reduce(moment.weekdaysShort(), function(n, ddd) {
        return n += '<div class="ddd" data-ddd="' + ddd + '"></div>';
      }, '');
    for (m = 0; m <= 11; m++) {
      d1 = moment([year, m, 1]);
      t.push('<div class="MMMM">' + moment.months()[m] + '</div>' + n + '<div class="MM"><a href="#" class="' + (year == moment().year() && m == moment().month() && 1 == moment().date() ? 'active ' : '') + 'D" data-d="' + d1.day() + '" data-date="' + year + '-' + ('00' + (m + 1)).slice(-2) + '-01" draggable="false"><span class="num">1</span><div class="content"></div></a>' + _.range(2, d1.daysInMonth() + 1).reduce(function(MM, d) {
        var month = ('00' + (m + 1)).slice(-2);
        var day = ('00' + d).slice(-2);
        var date = year + '-' + month + '-' + day;
        var isDateInEventList = eventList.findIndex(e => e.date === date) === -1 ? false : true;
        var eventIcon = (isDateInEventList ? '<i class="green circle tiny icon"></i>' : '<i class="add tiny icon"></i>');
        var eventAction = (isDateInEventList ? '<span class="hover" data-content="Show event">' : '<span class="hover" data-content="Add event">');
        return MM += '<a href="#" class="' + (year == moment().year() && m == moment().month() && d == moment().date() ? 'active ' : '') + 'D" data-date="' + year + '-' + ('00' + (m + 1)).slice(-2) + '-' + ('00' + d).slice(-2) + '" draggable="false">' + '<span class="num">' + d + eventAction + eventIcon + '</i></span>' + '</a>';
      }, '') + '</div>');
      w = Math.max(w, Math.ceil((d1.day() + d1.daysInMonth()) / 7));
      if (m == 3 || m == 7 || m == 11) {
        y += '<div class="M" data-w="' + w + '">' + t.join('</div><div class="M" data-w="' + w + '">') + '</div>';
        r += w;
        w = 0;
        t = [];
      }
    }
    this.element.innerHTML = '<nav><a href="#" class="nav prev" draggable="false"><svg viewBox="0 0 512 512"><path d="M189.8,349.7c3.1-3.1,3-8,0-11.3L123.4,264H408c4.4,0,8-3.6,8-8c0-4.4-3.6-8-8-8H123.4l66.3-74.4c2.9-3.4,3.2-8.1,0.1-11.2c-3.1-3.1-8.5-3.3-11.4-0.1c0,0-79.2,87-80,88S96,253.1,96,256s1.6,4.9,2.4,5.7s80,88,80,88c1.5,1.5,3.6,2.3,5.7,2.3C186.2,352,188.2,351.2,189.8,349.7z"/></svg></a><div class="title"><strong>' + year + '</strong></div><a href="#" class="nav next" draggable="false"><svg viewBox="0 0 512 512"><path d="M322.2,349.7c-3.1-3.1-3-8,0-11.3l66.4-74.4H104c-4.4,0-8-3.6-8-8c0-4.4,3.6-8,8-8h284.6l-66.3-74.4c-2.9-3.4-3.2-8.1-0.1-11.2c3.1-3.1,8.5-3.3,11.4-0.1c0,0,79.2,87,80,88s2.4,2.8,2.4,5.7s-1.6,4.9-2.4,5.7s-80,88-80,88c-1.5,1.5-3.6,2.3-5.7,2.3C325.8,352,323.8,351.2,322.2,349.7z"/></svg></a></nav><div class="YYYY" data-w="' + r + '">' + y + '</div>';
    this.element.querySelector('.prev').addEventListener('click', () => {
      this.show(--this.year);
    });
    this.element.querySelector('.next').addEventListener('click', () => {
      this.show(++this.year);
    });
    this.element.querySelectorAll('.D').forEach((element) => {
      element.addEventListener('click', (event) => {
        var element = event.target;
        while (element) {
          if (element.hasAttribute('data-date')) {
            this.callback(element.getAttribute('data-date'));
            break;
          } else {
            element = element.parentElement;
          }
        }
      });
    });
    $('.hover').popup({
      position: 'top center'
    });
  }
}

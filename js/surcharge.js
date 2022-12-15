(function ($) {
  var milipolJS = {
    init: function () {
      this.animateFigures();
    },

    animateFigures: function () {
      /*
      jQuery animateNumber plugin v0.0.14
      (c) 2013, Alexandr Borisov.
      https://github.com/aishek/jquery-animateNumber
     */
      (function (d) {
        var r = function (b) {
            return b.split("").reverse().join("");
          },
          m = {
            numberStep: function (b, a) {
              var e = Math.floor(b);
              d(a.elem).text(e);
            },
          },
          g = function (b) {
            var a = b.elem;
            a.nodeType &&
              a.parentNode &&
              ((a = a._animateNumberSetter),
              a || (a = m.numberStep),
              a(b.now, b));
          };
        d.Tween && d.Tween.propHooks
          ? (d.Tween.propHooks.number = { set: g })
          : (d.fx.step.number = g);
        d.animateNumber = {
          numberStepFactories: {
            append: function (b) {
              return function (a, e) {
                var f = Math.floor(a);
                d(e.elem)
                  .prop("number", a)
                  .text(f + b);
              };
            },
            separator: function (b, a, e) {
              b = b || " ";
              a = a || 3;
              e = e || "";
              return function (f, k) {
                var u = 0 > f,
                  c = Math.floor((u ? -1 : 1) * f).toString(),
                  n = d(k.elem);
                if (c.length > a) {
                  for (
                    var h = c,
                      l = a,
                      m = h.split("").reverse(),
                      c = [],
                      p,
                      s,
                      q,
                      t = 0,
                      g = Math.ceil(h.length / l);
                    t < g;
                    t++
                  ) {
                    p = "";
                    for (q = 0; q < l; q++) {
                      s = t * l + q;
                      if (s === h.length) break;
                      p += m[s];
                    }
                    c.push(p);
                  }
                  h = c.length - 1;
                  l = r(c[h]);
                  c[h] = r(parseInt(l, 10).toString());
                  c = c.join(b);
                  c = r(c);
                }
                n.prop("number", f).text((u ? "-" : "") + c + e);
              };
            },
          },
        };
        d.fn.animateNumber = function () {
          for (
            var b = arguments[0],
              a = d.extend({}, m, b),
              e = d(this),
              f = [a],
              k = 1,
              g = arguments.length;
            k < g;
            k++
          )
            f.push(arguments[k]);
          if (b.numberStep) {
            var c = this.each(function () {
                this._animateNumberSetter = b.numberStep;
              }),
              n = a.complete;
            a.complete = function () {
              c.each(function () {
                delete this._animateNumberSetter;
              });
              n && n.apply(this, arguments);
            };
          }
          return e.animate.apply(e, f);
        };
      })(jQuery);

      //Animate key Number

      var $window = $(window);
      var $elem = $(".key-numbers");

      function isScrolledIntoView($elem, $window) {
        var docViewTop = $window.scrollTop();
        var docViewBottom = docViewTop + $window.height();

        var elemTop = $elem.offset().top;
        var elemBottom = elemTop + $elem.height();

        return elemBottom <= docViewBottom && elemTop >= docViewTop;
      }

      $(document).on("scroll", function () {
        if ($elem.length > 0) {
          if (isScrolledIntoView($elem, $window)) {
            $(".exhibitors p").animateNumber(
              { number: 222, easing: "easeOutQuart" },
              2000
            );

            $(".trade-visitors p").animateNumber(
              { number: 8765, easing: "easeOutQuart" },
              2000
            );

            $(".official-delegates p").animateNumber(
              { number: 314, easing: "easeOutQuart" },
              2000
            );

            $(".journalist p").animateNumber(
              { number: 352, easing: "easeOutQuart" },
              2000
            );

            $(document).off("scroll");
          }
        }
      });
    },
  };

  //SLIDER TESTIMONIALS

  $(".slider").each(function () {
    var $this = $(this);
    var $group = $this.find(".slide_group");
    var $slides = $this.find(".slide");
    var bulletArray = [];
    var currentIndex = 0;
    var timeout;

    function move(newIndex) {
      var animateLeft, slideLeft;

      advance();

      if ($group.is(":animated") || currentIndex === newIndex) {
        return;
      }

      bulletArray[currentIndex].removeClass("active");
      bulletArray[newIndex].addClass("active");

      if (newIndex > currentIndex) {
        slideLeft = "100%";
        animateLeft = "-100%";
      } else {
        slideLeft = "-100%";
        animateLeft = "100%";
      }

      $slides.eq(newIndex).css({
        display: "block",
        left: slideLeft,
      });
      $group.animate(
        {
          left: animateLeft,
        },
        function () {
          $slides.eq(currentIndex).css({
            display: "none",
          });
          $slides.eq(newIndex).css({
            left: 0,
          });
          $group.css({
            left: 0,
          });
          currentIndex = newIndex;
        }
      );
    }

    function advance() {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        if (currentIndex < $slides.length - 1) {
          move(currentIndex + 1);
        } else {
          move(0);
        }
      }, 4000);
    }

    $(".next_btn").on("click", function () {
      if (currentIndex < $slides.length - 1) {
        move(currentIndex + 1);
      } else {
        move(0);
      }
    });

    $(".previous_btn").on("click", function () {
      if (currentIndex !== 0) {
        move(currentIndex - 1);
      } else {
        move(3);
      }
    });

    $.each($slides, function (index) {
      var $button = $('<a class="slide_btn">&bull;</a>');

      if (index === currentIndex) {
        $button.addClass("active");
      }
      $button
        .on("click", function () {
          move(index);
        })
        .appendTo(".slide_buttons");
      bulletArray.push($button);
    });

    advance();
  });

  //scroll top

  $(".third-container").before("<div id='btn-scroll-top'></div>");
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $("#btn-scroll-top").fadeIn();
    } else {
      $("#btn-scroll-top").fadeOut();
    }
  });

  $("#btn-scroll-top").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      800
    );
    return false;
  });

  // Dynamic counter
  $("#container-dates").countdown("2024/10/29", function (event) {
    $("#month").html(event.strftime("%m"));
    $("#day").html(event.strftime("%n"));
    $("#hour").html(event.strftime("%H"));
  });

  // add last item to contacts-list section

  $(".contacts-list .cl-content").append(
    $(
      "<a href='https://milipolqatar.cms-cxpm.com/Events/2020-Seminar-Programme' class='cl-item last-item'></div>"
    ).html("<p>See all speakers</p>")
  );

  milipolJS.init();
})(jQuery);

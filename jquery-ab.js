$(function () {

    var info = [];
    $(".pa").each(function () {
        var par = $(this).find("p");
        info.push(par);
    });

    var current = 0;
    $(".slider").html(info[current]);

    setInterval(function () {
        current++;
        if (current === info.length)
            current = 0;

        $(".slider").animate({opacity: 0}, 1500, function () {
            $(this).html(info[current]);
        })
                .animate({opacity: 1.0}, 1500);
    });

    $(".start_BT").click(function () {
        $(".firstPage").fadeOut(0);
        $(".secondPage").fadeIn(1000);
    });

    $(".secondPage img").mouseover(function () {
        $(this).css("opacity", "1.0");
    });

    $(".secondPage img").mouseleave(function () {
        $(this).css("opacity", "0.5");
    });

    $(".secondPage img").each(function () {
        $(this).click(function () {
            $(".images").css("box-shadow", "none");
            $(".secondPage .continue_BT").fadeIn(1000)
                    .css("display", "inline-block");
            $(this).css("box-shadow", "1px 6px 3px #999");
        });
    });

    $(".secondPage img:eq(0)").click(function () {
        $(".board div").css("background-image", "url(1.jpg)");
        $(".board #c0").css("background-image", "none");
    });

    $(".secondPage img:eq(1)").click(function () {
        $(".board div").css("background-image", "url(2.jpg)");
        $(".board #c0").css("background-image", "none");
    });

    $(".secondPage img:eq(2)").click(function () {
        $(".board div").css("background-image", "url(3.jpg)");
        $(".board #c0").css("background-image", "none");
    });

    $(".continue_BT").click(function () {
        $(".secondPage").fadeOut(0);
        $(".thirdPage").fadeIn(2000);
        $(".thirdPage .board").fadeIn(0);

        $(".board").css("pointer-events", "none");

        for (var i = 0; i < tiles.length; i++)
            $(tiles[i]).css("opacity", "1.0");
    });

    var empty = 1;
    $.fn.extend({eight:
                function (boxSize) {
                    $('.board').children("div:nth-child(" + empty + ")").css("background-image", "none");
                    $('.board').children('div').click(function () {
                        Move(this, boxSize);
                    });
                }
    });

    var searchId = [], k = 0;
    function Available() {
        if (newX === 0 + 'px' && newY === 0 + 'px') {
            searchId[k++] = checkId(150, 0);
            searchId[k++] = checkId(0, 150);

        } else if (newX === 150 + 'px' && newY === 0 + 'px') {
            searchId[k++] = checkId(0, 0);
            searchId[k++] = checkId(300, 0);
            searchId[k++] = checkId(150, 150);

        } else if (newX === 300 + 'px' && newY === 0 + 'px') {
            searchId[k++] = checkId(150, 0);
            searchId[k++] = checkId(300, 150);

        } else if (newX === 0 + 'px' && newY === 150 + 'px') {
            searchId[k++] = checkId(0, 0);
            searchId[k++] = checkId(0, 300);
            searchId[k++] = checkId(150, 150);

        } else if (newX === 150 + 'px' && newY === 150 + 'px') {
            searchId[k++] = checkId(150, 0);
            searchId[k++] = checkId(0, 150);
            searchId[k++] = checkId(300, 150);
            searchId[k++] = checkId(150, 300);

        } else if (newX === 300 + 'px' && newY === 150 + 'px') {
            searchId[k++] = checkId(300, 300);
            searchId[k++] = checkId(300, 0);
            searchId[k++] = checkId(150, 150);

        } else if (newX === 0 + 'px' && newY === 300 + 'px') {
            searchId[k++] = checkId(0, 150);
            searchId[k++] = checkId(150, 300);

        } else if (newX === 150 + 'px' && newY === 300 + 'px') {
            searchId[k++] = checkId(0, 300);
            searchId[k++] = checkId(300, 300);
            searchId[k++] = checkId(150, 150);

        } else if (newX === 300 + 'px' && newY === 300 + 'px') {
            searchId[k++] = checkId(300, 150);
            searchId[k++] = checkId(150, 300);
        }

        k = 0;
    }

    var id = 0;
    function checkId(x, y) {
        for (var i = 0; i < tiles.length; i++) {
            if ($(tiles[i]).css("left") === x + 'px' && $(tiles[i]).css("top") === y + 'px')
                id = $(tiles[i]).attr("id");
        }
        return id;
    }

    var newX = 0, newY = 0;
    function Move(clicked, boxSize) {
        var movable = false;
        var oldX = $('.board').children("div:nth-child(" + empty + ")").css('left');
        var oldY = $('.board').children("div:nth-child(" + empty + ")").css('top');
        newX = $(clicked).css('left');
        newY = $(clicked).css('top');

        if (oldX === newX && newY === (parseInt(oldY) - boxSize - 5) + 'px') { //check move down 
            movable = true;
        }
        if (oldX === newX && newY === (parseInt(oldY) + boxSize + 5) + 'px') { //check move up
            movable = true;
        }
        if ((parseInt(oldX) - boxSize - 5) + 'px' === newX && newY === oldY) { //check move right
            movable = true;
        }
        if ((parseInt(oldX) + boxSize + 5) + 'px' === newX && newY === oldY) { //check move left
            movable = true;
        }

        searchId = [];

        //console.log(oldX, oldY, newX, newY, movable);

        if (movable) {
            $(clicked).animate({left: oldX, top: oldY}, 500, function () {
                Available();
                for (var i = 0; i < tiles.length; i++)
                    $(tiles[i]).css("opacity", "0.5");

                $('.board').children("div:nth-child(" + empty + ")").css('left', newX);
                $('.board').children("div:nth-child(" + empty + ")").css('top', newY);
                Correct();
            });
        }
    }

    var okay = 0;
    $(".board div").mouseover(function () {
        if (okay)
            for (var i = 0; i < searchId.length; i++)
                for (var j = 0; j < tiles.length; j++)
                    if (tiles[j].attr("id") === searchId[i]) {
                        $(tiles[j]).css("opacity", "1.0");
                    }
    });

    $(".board div").mouseleave(function () {
        if (okay)
            for (var i = 0; i < tiles.length; i++)
                $(tiles[i]).css("opacity", "0.5");
    });

    var tiles = [$("#c0"), $("#c1"), $("#c2"), $("#c3"),
        $("#c4"), $("#c5"), $("#c6"), $("#c7"), $("#c8")];

    function Correct() {
        if (tiles[8].css("left") === 300 + 'px' && tiles[8].css("top") === 300 + 'px')
            if (tiles[7].css("left") === 150 + 'px' && tiles[7].css("top") === 300 + 'px')
                if (tiles[6].css("left") === 0 + 'px' && tiles[6].css("top") === 300 + 'px')
                    if (tiles[5].css("left") === 300 + 'px' && tiles[5].css("top") === 150 + 'px')
                        if (tiles[4].css("left") === 150 + 'px' && tiles[4].css("top") === 150 + 'px')
                            if (tiles[3].css("left") === 0 + 'px' && tiles[3].css("top") === 150 + 'px')
                                if (tiles[2].css("left") === 300 + 'px' && tiles[2].css("top") === 0 + 'px')
                                    if (tiles[1].css("left") === 150 + 'px' && tiles[1].css("top") === 0 + 'px') {
                                        $("#solve").hide(0);
                                        $("#enter").hide(0);
                                        $("#comp").hide(0);
                                        $("#cong").fadeIn(2000);
                                        $("#res").fadeIn(2000);

                                        $(document).keypress(function (e) {
                                            if (e.which === 32)
                                                location.reload();
                                        });
                                    }
    }

    $('.thirdPage').eight(145);

    $(".selection").change(function () {
        $(".shuffle_BT").fadeIn(500);
        if ($(this).val() === "3 Moves") {
            $(".shuffle_BT").click(function () {
                $(".shuffle").hide(0);
                Shuffle3();

                okay = 1;
                for (var i = 0; i < tiles.length; i++)
                    $(tiles[i]).css("opacity", "0.5");
            });
        } else if ($(this).val() === "30 Moves") {
            $(".shuffle_BT").click(function () {
                $(".shuffle").hide(0);
                Shuffle30();

                okay = 1;
                for (var i = 0; i < tiles.length; i++)
                    $(tiles[i]).css("opacity", "0.5");
            });
        }
    });

    function Shuffle3() {
        $(".board").css("pointer-events", "auto");

        tiles[1].animate({left: 0, top: 0}, 500);
        tiles[4].delay(500).animate({left: 150, top: 0}, 500);
        tiles[5].delay(1000).animate({left: 150, top: 150}, 500);
        $('.board').children("div:nth-child(" + empty + ")").css('left', 300);
        $('.board').children("div:nth-child(" + empty + ")").css('top', 150);

        searchId[k++] = $(tiles[2]).attr("id");
        searchId[k++] = $(tiles[5]).attr("id");
        searchId[k++] = $(tiles[8]).attr("id");

        $("#solve").fadeIn(2000);
        $("#enter").fadeIn(2000);
    }

    function Shuffle30() {
        $(".board").css("pointer-events", "auto");

        tiles[1].animate({left: 0, top: 0}, 500);
        tiles[4].delay(500).animate({left: 150, top: 0}, 500);
        tiles[5].delay(1000).animate({left: 150, top: 150}, 500);
        tiles[8].delay(1500).animate({left: 300, top: 150}, 500);
        tiles[7].delay(2000).animate({left: 300, top: 300}, 500);
        tiles[5].delay(1000).animate({left: 150, top: 300}, 500);
        tiles[3].delay(3000).animate({left: 150, top: 150}, 500);
        tiles[6].delay(3500).animate({left: 0, top: 150}, 500);
        tiles[5].delay(1000).animate({left: 0, top: 300}, 500);
        tiles[3].delay(1000).animate({left: 150, top: 300}, 500);
        tiles[4].delay(4000).animate({left: 150, top: 150}, 500);
        tiles[2].delay(5500).animate({left: 150, top: 0}, 500);
        tiles[8].delay(4000).animate({left: 300, top: 0}, 500);
        tiles[4].delay(1000).animate({left: 300, top: 150}, 500);
        tiles[3].delay(2000).animate({left: 150, top: 150}, 500);
        tiles[7].delay(5000).animate({left: 150, top: 300}, 500);
        tiles[4].delay(1000).animate({left: 300, top: 300}, 500);
        tiles[3].delay(1000).animate({left: 300, top: 150}, 500);
        tiles[6].delay(5000).animate({left: 150, top: 150}, 500);
        tiles[1].delay(9000).animate({left: 0, top: 150}, 500);
        tiles[2].delay(4000).animate({left: 0, top: 0}, 500);
        tiles[6].delay(1000).animate({left: 150, top: 0}, 500);
        tiles[3].delay(2000).animate({left: 150, top: 150}, 500);
        tiles[4].delay(3000).animate({left: 300, top: 150}, 500);
        tiles[7].delay(4000).animate({left: 300, top: 300}, 500);
        tiles[3].delay(1000).animate({left: 150, top: 300}, 500);
        tiles[1].delay(3000).animate({left: 150, top: 150}, 500);
        tiles[2].delay(3000).animate({left: 0, top: 150}, 500);
        tiles[6].delay(3000).animate({left: 0, top: 0}, 500);
        tiles[1].delay(1000).animate({left: 150, top: 0}, 500);
        $('.board').children("div:nth-child(" + empty + ")").css('left', 150);
        $('.board').children("div:nth-child(" + empty + ")").css('top', 150);

        searchId[k++] = $(tiles[1]).attr("id");
        searchId[k++] = $(tiles[2]).attr("id");
        searchId[k++] = $(tiles[3]).attr("id");
        searchId[k++] = $(tiles[4]).attr("id");

        $("#solve").fadeIn(2000);
        $("#enter").fadeIn(2000);
    }

    $(document).keypress(function (e) {
        if (e.which === 13) {
            $(".board").css("pointer-events", "none");
            okay = 0;
            for (var i = 0; i < tiles.length; i++)
                $(tiles[i]).css("opacity", "0.5");

            tiles[8].addClass("big").css({left: 300, top: 300});
            tiles[7].addClass("big").css({left: 150, top: 300});
            tiles[6].addClass("big").css({left: 0, top: 300});
            tiles[5].addClass("big").css({left: 300, top: 150});
            tiles[4].addClass("big").css({left: 150, top: 150});
            tiles[3].addClass("big").css({left: 0, top: 150});
            tiles[2].addClass("big").css({left: 300, top: 0});
            tiles[1].addClass("big").css({left: 150, top: 0});
            tiles[0].css({left: 0, top: 0});

            $("#enter").hide(0);
            $("#solve").hide(0);
            $("#res").hide(0);
            $("#cong").fadeIn(2000);
            $("#comp").fadeIn(2000);

            $(document).keypress(function (e) {
                if (e.which === 32)
                    location.reload();
            });
        }
    });

});




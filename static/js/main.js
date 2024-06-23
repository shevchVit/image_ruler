document.addEventListener("DOMContentLoaded", () => {

    let perspective_points = [];
    let defined_points = [];
    let undefined_points = [];
    let image_width = 0;
    let image_height = 0;
    let mode = 0
    let dot_r = 4;
    let current_angles = [0, 0, 0];
    let p_step = 0.5;
    let zoom = 1;

    $("#upload_file").on("change", (e) => {
        let file = e.target.files[0];
        if (file.type && !file.type.startsWith('image/')) {
            console.log('File is not an image.', file.type, file);
            return;
        }

        let freader = new FileReader()
        freader.readAsDataURL(file);
        freader.onload = () => {
            var image = freader.result;
            $("#background").attr("src", image);

            setTimeout(() => {
                image_width = $("#background").width();
                image_height = $("#background").height();
                
                $("#monitor").width(image_width);
                $("#monitor").height(image_height);
    
                $("#grid").width(image_width);
                $("#grid").height(image_height);
                $("#grid").attr("width", image_width);
                $("#grid").attr("height", image_height);
    
                $("#perspective_mask").width(image_width);
                $("#perspective_mask").height(image_height);
    
                $("#marks").width(image_width);
                $("#marks").height(image_height);
    
                draw_grid();

                $("#monitor").on("click", (e) => {
                    var x = e.offsetX / zoom;
                    var y = e.offsetY / zoom;

                    switch (mode) {
                        case 1:
                            set_perspective_point(x, y);
                            break;
                        case 2:
                            set_defined_point(x, y);
                            break;
                        case 3:
                            set_undefined_point(x, y);
                            break;
                        default:
                            break;
                    }
                })
            }, 100)
        }
    })

    $($(".trans")[0]).on("click", (e) => {
        current_angles[0] += p_step;
        current_angles[1] -= p_step;
        rotate_image();
    })

    $($(".trans")[1]).on("click", (e) => {
        current_angles[0] += p_step;
        rotate_image();
    })

    $($(".trans")[2]).on("click", (e) => {
        current_angles[0] += p_step;
        current_angles[1] += p_step;
        rotate_image();
    })

    $($(".trans")[3]).on("click", (e) => {
        current_angles[2] -= p_step;
        rotate_image();
    })

    $($(".trans")[4]).on("click", (e) => {
        current_angles[1] -= p_step;
        rotate_image();
    })

    $($(".trans")[6]).on("click", (e) => {
        current_angles[1] += p_step;
        rotate_image();
    })

    $($(".trans")[7]).on("click", (e) => {
        current_angles[2] += p_step;
        rotate_image();
    })

    $($(".trans")[8]).on("click", (e) => {
        current_angles[0] -= p_step;
        current_angles[1] -= p_step;
        rotate_image();
    })

    $($(".trans")[9]).on("click", (e) => {
        current_angles[0] -= p_step;
        rotate_image();
    })

    $($(".trans")[10]).on("click", (e) => {
        current_angles[0] -= p_step;
        current_angles[1] += p_step;
        rotate_image();
    })

    $("#perspective_step").on("change", (e) => {
        p_step = Number(e.target.value);
    })


    $("#ch_scale").on("change", (e) => {
        zoom = Number(e.target.value)
        $("#monitor").css("zoom", zoom);
    })

    $("#set_perspective").on("click", (e) => {
        $("#set_perspective").toggleClass("active");
        if ($("#set_perspective").hasClass("active")) {
            $("#set_origin_points").removeClass("active");
            $("#set_undefined_points").removeClass("active");
            mode = 1;
        } else {
            mode = 0;
        }
    })

    $("#set_origin_points").on("click", (e) => {
        $("#set_origin_points").toggleClass("active");
        if ($("#set_origin_points").hasClass("active")) {
            $("#set_perspective").removeClass("active");
            $("#set_undefined_points").removeClass("active");
            mode = 2;
        } else {
            mode = 0;
        }
    })

    $("#set_undefined_points").on("click", (e) => {
        $("#set_undefined_points").toggleClass("active");
        if ($("#set_undefined_points").hasClass("active")) {
            $("#set_perspective").removeClass("active");
            $("#set_origin_points").removeClass("active");
            mode = 3
        } else {
            mode = 0;
        }
    })

    $("#reset_perspective").on("click", (e) => {
        perspective_points = [];
        update_perspective();
    })

    $("#reset_origin_points").on("click", (e) => {
        defined_points = [];
        var defined_points_elements = $(".defined_point");
        $(defined_points_elements[0]).find("span")[0].innerHTML = "x1:";
        $(defined_points_elements[0]).find("span")[1].innerHTML = "y1:";

        $(defined_points_elements[1]).find("span")[0].innerHTML = "x2:";
        $(defined_points_elements[1]).find("span")[1].innerHTML = "y2:";
        $("#result").html("Длина: ");
        update_defined_points();
    })

    $("#defined_length").on("change", (e) => {
        calc_length();
    })

    $("#reset_undefined_points").on("click", (e) => {
        undefined_points = [];
        var undefined_points_elements = $(".undefined_point");
        $(undefined_points_elements[0]).find("span")[0].innerHTML = "x1:";
        $(undefined_points_elements[0]).find("span")[1].innerHTML = "y1:";

        $(undefined_points_elements[1]).find("span")[0].innerHTML = "x2:";
        $(undefined_points_elements[1]).find("span")[1].innerHTML = "y2:";
        $("#result").html("Длина: ");
        update_undefined_points();
    })

    $(document).on("keydown", (e) => {
        // console.log(e.keyCode)
        switch (e.keyCode) {
            case 27:
                $("#toolbar").toggleClass("active");
                e.preventDefault();
                break;
            case 81:
                current_angles[0] += p_step;
                current_angles[1] -= p_step;
                rotate_image();
                e.preventDefault();
                break;
            case 87:
                current_angles[0] += p_step;
                rotate_image();
                e.preventDefault();
                break;
            case 69:
                current_angles[0] += p_step;
                current_angles[1] += p_step;
                rotate_image();
                e.preventDefault();
                break;
            case 65:
                current_angles[1] -= p_step;
                rotate_image();
                e.preventDefault();
                break;
            case 68:
                current_angles[1] += p_step;
                rotate_image();
                e.preventDefault();
                break;
            case 90:
                current_angles[0] -= p_step;
                current_angles[1] -= p_step;
                rotate_image();
                e.preventDefault();
                break;
            case 88:
                current_angles[0] -= p_step;
                rotate_image();
                e.preventDefault();
                break;
            case 67:
                current_angles[0] -= p_step;
                current_angles[1] += p_step;
                rotate_image();
                e.preventDefault();
                break;
            case 219:
                current_angles[2] -= p_step;
                rotate_image();
                e.preventDefault();
                break;
            case 221:
                current_angles[2] += p_step;
                rotate_image();
                e.preventDefault();
                break;
            default:
                break;
        }
    })

    const set_perspective_point = (x, y) => {
        perspective_points.push([x, y]);
        
        if (perspective_points.length > 4)
            perspective_points.shift();
        
        update_perspective();
    }

    const set_defined_point = (x, y) => {
        defined_points.push([x, y]);
        
        if (defined_points.length > 2)
            defined_points.shift();

        update_defined_points();
    }

    const set_undefined_point = (x, y) => {
        undefined_points.push([x, y]);
        
        if (undefined_points.length > 2)
            undefined_points.shift();

        update_undefined_points();
    }

    const update_undefined_points = () => {
        $(".yellow").remove();
        var defined_points_elements = $(".undefined_point");

        for (var i = 0; i < undefined_points.length; ++i) {
            var x = undefined_points[i][0];
            var y = undefined_points[i][1];

            $(defined_points_elements[i]).find("span")[0].innerHTML = `x${i + 1}: ${x}`;
            $(defined_points_elements[i]).find("span")[1].innerHTML = `y${i + 1}: ${y}`;

            $("#marks").append(`<div class="dot yellow" style="left:${x - dot_r}px; top:${y - dot_r}px;"></div>`)
        }

        calc_length();
    }

    const update_defined_points = () => {
        $(".green").remove();
        var defined_points_elements = $(".defined_point");


        for (var i = 0; i < defined_points.length; ++i) {
            var x = defined_points[i][0];
            var y = defined_points[i][1];

            $(defined_points_elements[i]).find("span")[0].innerHTML = `x${i + 1}: ${x}`;
            $(defined_points_elements[i]).find("span")[1].innerHTML = `y${i + 1}: ${y}`;

            $("#marks").append(`<div class="dot green" style="left:${x - dot_r}px; top:${y - dot_r}px;"></div>`)
        }

        calc_length();
    }

    const calc_length = () => {
        if (defined_points.length == 2 && undefined_points.length == 2 && $("#defined_length").val()) {
            var len1 = Math.sqrt(Math.pow(defined_points[0][0] - defined_points[1][0], 2) + Math.pow(defined_points[0][1] - defined_points[1][1], 2));
            var len2 = Math.sqrt(Math.pow(undefined_points[0][0] - undefined_points[1][0], 2) + Math.pow(undefined_points[0][1] - undefined_points[1][1], 2));
            var val = Number($("#defined_length").val());

            var calc_result = len2 * val / len1;
            $("#result").html(`Длина: ${calc_result}`);
        }
    }

    const update_perspective = () => {
        $("#perspective_mask").html("");

        var c_x = 0;
        var c_y = 0;

        for (var i = 0; i < perspective_points.length; ++i) {
            var x = perspective_points[i][0];
            var y = perspective_points[i][1];

            c_x += x;
            c_y += y;

            $("#perspective_mask").append(`<div class="dot red" style="left:${x - dot_r}px; top:${y - dot_r}px;"></div>`);
        }

        if (perspective_points.length == 4) {
            c_x /= 4;
            c_y /= 4;

            $("#perspective_mask").append(`<div class="dot purple" style="left:${c_x - dot_r}px; top:${c_y - dot_r}px;"></div>`);
            set_transform_origin(c_x, c_y);
        } else {
            set_transform_origin(image_width / 2, image_width / 2);
        }
    }

    const set_transform_origin = (x, y) => {
        $("#background").css("transform-origin", `${x}px ${y}px`);
        $("#perspective_mask").css("transform-origin", `${x}px ${y}px`);
    }

    const rotate_image = () => {
        x = current_angles[0];
        y = current_angles[1];
        z = current_angles[2];

        $("#background").css("transform", `perspective(400px) rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`);
        $("#perspective_mask").css("transform", `perspective(400px) rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`);
    }

    const draw_grid = () => {
        var canvas = $("canvas")[0];
        var ctx = canvas.getContext("2d");

        step_h = Math.log2(image_height) * 4;
        step_w = Math.log2(image_width) * 4;

        for (var i = 0; i < image_width; i += step_w) {
            ctx.moveTo(i, 0);
            ctx.lineTo(i, image_height);
        }

        for (var i = 0; i < image_height; i += step_h) {
            ctx.moveTo(0, i);
            ctx.lineTo(image_width, i);
        }

        ctx.stroke();
    }
})
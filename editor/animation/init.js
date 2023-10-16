requirejs(['ext_editor_io2', 'jquery_190', 'raphael_210'],
    function (extIO, $) {
        function hourglass_flips_visualization(tgt_node, data) {
            if (!data || !data.ext) {
                return
            }

            /**
             * 
             * values
             * 
             */
            const inputs = data.in
            const correct_answer = data.out_ext.answer
            const input_hourglasses = inputs[0].map(inp=>inp.values)
            const t = inputs[1]
            const revs = data.ext.explanation
            const scale = 1.7

            /**
             * 
             * hourglass_transition
             * 
             */
            let inp = structuredClone(input_hourglasses)
            let prev_el = 0
            const hourglass_transition = [[0, 0, inp, [], []]]
            revs.forEach(([el, rv]) => {
                if (rv.length > 0) {
                    const new_inp = []
                    const new_empty_hourglass = []
                    let d = el - prev_el
                    inp.forEach(([u, l], i) => {
                        if (u > 0 && u == d) {
                            new_empty_hourglass.push(i)
                        }
                        new_inp.push([u - Math.min(u, d), l + Math.min(u, d)])
                    })
                    hourglass_transition.push([el, d, structuredClone(new_inp), [], new_empty_hourglass])
                    rv.forEach(r=>{
                        new_inp[r] = [new_inp[r][1], new_inp[r][0]]
                    })
                    hourglass_transition.push([el, 0, structuredClone(new_inp), rv, []])
                    prev_el = el
                    inp = structuredClone(new_inp)
                }
            })
            if (correct_answer != 'None') {
                const new_inp = []
                const new_empty_hourglass = []
                let d = t - prev_el
                inp.forEach(([u, l], i) => {
                    const new_l = l + Math.min(u, d)
                    if (u > 0 && u == d) {
                        new_empty_hourglass.push(i)
                    }
                    new_inp.push([u - Math.min(u, d), l + Math.min(u, d)])
                })
                hourglass_transition.push([t, d, new_inp, [], new_empty_hourglass])
            }

            /**
             * 
             * paper
             * 
             */
            const grid_seize_px_w = (20 * input_hourglasses.length + 20) * scale
            const grid_seize_px_h = hourglass_transition.length * 30 * scale
            const os = 10
            const paper = Raphael(tgt_node, grid_seize_px_w + os * 2, grid_seize_px_h + os * 2)

            /**
             * 
             * attr
             * 
             */
            const attr = {
                header_text: {
                    'font-family': 'Times',
                    'font-weight': 'bold',
                },
                rest_sand: {
                    'font-family': 'Times',
                    'font-weight': 'bold',
                },
                border_line: {
                    'stroke': '#82D1F5',
                    'stroke': '#65A1CF',
                },
                hourglass: {
                    'stroke': '#82D1F5',
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
                    'fill': '#82D1F5',
                },
                hourglass_reverse: {
                    'stroke': 'orange',
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
                    'fill': 'orange',
                },
                hourglass_empty: {
                    'stroke': '#65A1CF',
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
                    'fill': '#65A1CF',
                },
            }

            /**
             * 
             * (func) draw_hourglass
             * 
             */
            const draw_hourglass = function (x, y, attr_name, upper_num, lower_num) {
                // hourglass
                paper.path([
                    'M', x * scale, y * scale,
                    'l', 2 * scale, 0 * scale,
                    'l', 0 * scale, 7 * scale,
                    'l', 5 * scale, 5 * scale,
                    'l', -5 * scale, 5 * scale,
                    'l', 0 * scale, 7 * scale,
                    'l', -2 * scale, 0 * scale,
                    'l', 14 * scale, 0 * scale,
                    'l', -2 * scale, 0 * scale,
                    'l', 0 * scale, -7 * scale,
                    'l', -5 * scale, -5 * scale,
                    'l', 5 * scale, -5 * scale,
                    'l', 0 * scale, -7 * scale,
                    'l', 2 * scale, 0 * scale,
                    'z',
                ]).attr(attr[attr_name]).attr({'stroke-width': 1*scale + 'px'})
                // sand_text_upper
                paper.text((x + 7)*scale, (y + 5)*scale, upper_num).attr(
                    attr.rest_sand).attr({'font-size': 8*scale + 'px'})
                // sand_text_lower
                paper.text((x + 7)*scale, (y + 19)*scale, lower_num).attr(
                    attr.rest_sand).attr({'font-size': 8*scale + 'px'})
            }

            /**
             * 
             * (func) draw_row
             * 
             */
            const draw_row = function (y, elapsed_time_total, elapsed_time, hourglasses, rev, empty) {
                // draw hourglasses
                hourglasses.forEach(([upper_num, lower_num], i) => {
                    let class_name = 'hourglass'
                    if (rev.includes(i)) {
                        class_name = 'hourglass_reverse'
                    }
                    if (empty.includes(i)) {
                        class_name = 'hourglass_empty'
                    }
                    draw_hourglass(20*i+20, y, class_name, upper_num, lower_num)
                })
                // minutes_text
                if (elapsed_time || elapsed_time_total == 0) {
                    paper.text(10*scale, (y + 13)*scale, elapsed_time_total).attr(
                        attr.rest_sand).attr({'font-size': 10*scale + 'px'})
                }
                // border
                if (elapsed_time) {
                    paper.path(['M', 0, (y - 3)*scale, 'H', (hourglasses.length*20+20)*scale]).attr(
                        attr.border_line).attr({'stroke-width': 0.5*scale + 'px'})
                }
            }

            /**
             * 
             * draw main
             * 
             */
            // text 'min'
            paper.text(9*scale, 6*scale, 'min').attr(attr.header_text).attr({'font-size': 7*scale + 'px'})
            // draw
            hourglass_transition.forEach(([elapsed_time_total, elapsed_time, hourglasses, rev, empty], i)=>{
                draw_row((i)*30+10, elapsed_time_total, elapsed_time, hourglasses, rev, empty)
            })
        }
        var io = new extIO({
            animation: function ($expl, data) {
                hourglass_flips_visualization(
                    $expl[0],
                    data,
                );
            }
        });
        io.start();
    }
);

import React, { useEffect } from 'react';
import * as echarts from 'echarts/lib/echarts.js'
import { GridComponent } from 'echarts/components';
import 'echarts/lib/chart/line';
import { v4 as uuidv4 } from 'uuid';

import { LIGHT_GREEN, LIGHT_RED } from '../constant'

const TrendLineChart = ({ data }) => {
    // Generate unique id for data
    const uniqueId = uuidv4();

    useEffect(() => {
        const chart = echarts.init(document.getElementById(uniqueId));
        echarts.use([GridComponent]);

        // Set color
        let lineColor;
        if (data[0] > data[data.length - 1]) {
            lineColor = { color: LIGHT_GREEN };
        } else {
            lineColor = { color: LIGHT_RED };
        }

        // Get data boundaries
        const min = Math.min(data)
        const max = Math.max(data)

        const option = {
            xAxis: {
                type: 'category',
                show: false,

            },
            yAxis: {
                type: 'value',
                show: false,
                min: min,
                max: max,
            },
            series: [{
                type: 'line',
                data: data,
                smooth: true,
                symbol: 'none',
                lineStyle: {
                    width: 1,
                    ...lineColor,
                },
            }],

        }

        chart.setOption(option);
        return () => chart.dispose();
    }, [data, uniqueId]);

    return <div id={uniqueId} style={{ width: '100%', height: '180px' }}></div>;
}

export default TrendLineChart;

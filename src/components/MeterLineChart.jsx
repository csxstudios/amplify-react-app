import React from 'react';
import {
    Chart,
    Series,
    ArgumentAxis,
    Label,
    Export,
    Legend,
    Margin,
    Title,
    Subtitle,
    Tooltip,
} from 'devextreme-react/chart';
import 'devextreme/dist/css/dx.light.css';
import { formatDate } from '../utils/format';

const MeterLineChart = (props) => {
    const customizeLabel = (arg) => {
        return formatDate(arg.value);
    }

    return (
        <>
            <Chart
                palette="Violet"
                dataSource={props.chartData}
            >
                <Series
                    valueField="meter"
                    argumentField="dateISO"
                    name="user"
                    type="line"
                    color="#ffaa66" />
                <Margin bottom={20} />
                <ArgumentAxis
                    valueMarginsEnabled={false}
                    discreteAxisDivisionMode="crossLabels"
                >
                    <Label customizeText={customizeLabel} />
                </ArgumentAxis>
                <Legend
                    verticalAlignment="bottom"
                    horizontalAlignment="center"
                    itemTextPosition="bottom"
                    visible={false}
                />
                <Export enabled={true} />
                <Title text="Energy Usage">
                    {/* <Subtitle text="As of 1/16/2023" /> */}
                </Title>
                <Tooltip enabled={true} />
            </Chart>
            <Chart
                palette="Violet"
                dataSource={props.chartData}
            >
                <Series
                    valueField="temp"
                    argumentField="dateISO"
                    name="user"
                    type="line"
                    color="#0d6efd" />
                <Margin bottom={20} />
                <ArgumentAxis
                    valueMarginsEnabled={false}
                    discreteAxisDivisionMode="crossLabels"
                >
                    <Label customizeText={customizeLabel} />
                </ArgumentAxis>
                <Legend
                    verticalAlignment="bottom"
                    horizontalAlignment="center"
                    itemTextPosition="bottom"
                    visible={false}
                />
                <Export enabled={true} />
                <Title text="Temperature">
                    {/* <Subtitle text="As of 1/16/2023" /> */}
                </Title>
                <Tooltip enabled={true} />
            </Chart>
        </>
    )
}

export default MeterLineChart
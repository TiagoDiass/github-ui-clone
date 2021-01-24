import React from 'react';
import Heatmap from 'react-calendar-heatmap';
import { subYears, isBefore, isSameDay, addDays } from 'date-fns';

import { Container } from './RandomCalendar.elements';

type HeatmapValue = { date: Date; count: number };

const RandomCalendar: React.FC = () => {
  const startDate = subYears(new Date(), 1);
  const endDate = new Date();

  return (
    <Container>
      <div className='wrapper'>
        <Heatmap
          startDate={startDate}
          endDate={endDate}
          values={generateHeatmapValues(startDate, endDate)}
          gutterSize={3.5}
          classForValue={(item: HeatmapValue) => {
            let maxCount = 0;

            // The maxCount will always be between 0 and 4
            if (item !== null) {
              maxCount = Math.max(item.count, 0);
              maxCount = Math.min(item.count, 4);
            }

            return `scale-${maxCount}`;
          }}
          showWeekdayLabels={true}
        />
      </div>
      <span>Random calendar (it doest not represent real data)</span>
    </Container>
  );
};

const generateHeatmapValues = (startDate: Date, endDate: Date): HeatmapValue[] => {
  const values: HeatmapValue[] = [];

  let currentDate = startDate;
  while (isBefore(currentDate, endDate) || isSameDay(currentDate, endDate)) {
    const count = Math.random() * 4;

    values.push({
      date: currentDate,
      count: Math.round(count),
    });

    currentDate = addDays(currentDate, 1);
  }

  return values;
};

export default RandomCalendar;

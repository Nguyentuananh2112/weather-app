import type { ForecastData } from "@/api/types"
import { format } from "date-fns/format";
import { CardContent, CardTitle, Card, CardHeader } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

interface WeatherForecastProps {
    data: ForecastData;
}

interface DailyForecast {
    date: number;
    tempMin: number;
    tempMax: number;
    humidity: number;
    wind: number;
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    };
}

const WeatherForecast = ({ data }: WeatherForecastProps) => {

    const dailyForecast = data.list.reduce((acc, forecast) => {
        const date = format(new Date(forecast.dt * 1000), 'yyyy-MM-dd');

        if (!acc[date]) {
            acc[date] = {
                tempMin: forecast.main.temp_min,
                tempMax: forecast.main.temp_max,
                humidity: forecast.main.humidity,
                wind: forecast.wind.speed,
                weather: forecast.weather[0],
                date: forecast.dt,
            };
        } else {
            acc[date].tempMin = Math.min(acc[date].tempMin, forecast.main.temp_min);
            acc[date].tempMax = Math.max(acc[date].tempMax, forecast.main.temp_max);
        }
        return acc;
    }, {} as Record<string, DailyForecast>);
    

    const nextDays = Object.values(dailyForecast).slice(0, 6); // Get next 5 days
    const formatTemp = (temp: number) => `${Math.round(temp)}°C`;

    return (
        <Card>
            <CardHeader>
                <CardTitle>5-Day Forecast</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    {nextDays.map((day) => {
                        return <div key={day.date}
                            className="grid grid-cols-3 items-center gap-4 rounded-lg border p-4"
                        >
                                <div>
                                    <p className="font-medium">
                                        {format(new Date(day.date * 1000), "EEE, MMM d")}
                                    </p>
                                    <p className="text-sm text-muted-foreground capitalize">
                                        {day.weather.description}
                                    </p>
                                </div>
                                <div className="flex justify-center gap-4">
                                    <span className="flex items-center text-blue-500">
                                        <ArrowDown className="mr-1 h-4 w-4" />
                                        {formatTemp(day.tempMin)}
                                    </span>
                                    <span className="flex items-center text-red-500">
                                        <ArrowUp className="mr-1 h-4 w-4" />
                                        {formatTemp(day.tempMax)}
                                    </span>
                                </div>

                                <div className="flex justify-end gap-4">
                                    <span className="flex items-center gap-1">
                                        <Droplets className="h-4 w-4 text-blue-500" />
                                        <span className="text-sm">{day.humidity}%</span>
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Wind className="h-4 w-4 text-blue-500" />
                                        <span className="text-sm">{day.wind} m/s</span>
                                    </span>
                                </div>
                            </div>;
                        
                    })}
                </div>
            </CardContent>
        </Card>
    )
}

export default WeatherForecast

import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import moment from "moment";
import formatMoney from "./../utils/formatMoney";
import "moment/locale/tr";

const Currency = () => {
  const currency = useSelector((state) => state.currencies.currency);
  if (currency.length !== 5) {
    return <div>yükleniyor</div>;
  }

  const data22 = {
    labels: currency.map((c) => moment(c.createdAt).format("HH:mm")),
    datasets: [
      {
        label: "Bitcoin",
        fill: true,
        lineTension: 0.1,
        borderColor: "rgba(223,223,223,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: currency.map((c) => c.turkishLira.toFixed(2)),
      },
    ],
  };
  return (
    <div className="relative dark:bg-dark-600">
      <div className="absolute bottom-0 left-0 w-full dark:text-dark-500">
        <div className="p-1 text-xs font-bold text-center">
          {currency.length === 5 > 0 && currency[3]["turkishLira"] > currency[4]["turkishLira"] ? (
            <div className="dark:text-red-400">↓ {formatMoney(currency[4]["turkishLira"], "TRY")} ₺</div>
          ) : (
            <div className="dark:text-green-400">↑ {formatMoney(currency[4]["turkishLira"], "TRY")} ₺</div>
          )}
        </div>
      </div>
      <Line
        data={data22}
        options={{
          scales: {
            yAxes: [
              {
                display: false,
              },
            ],
            xAxes: [
              {
                display: false,
              },
            ],
          },
        }}
        legend={{ display: false }}
        width={400}
        height={400}
      />
    </div>
  );
};

export default Currency;

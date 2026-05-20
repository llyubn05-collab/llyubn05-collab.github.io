fetch("/data/poems.csv")
    .then(response => response.text())
    .then(csv => {
        const data = csv
            .split("\n") // 여러 줄로 나눔 
            .slice(1) // 2번째 줄부터 
            .filter(line => line.trim() !== "") // 공백 아닌 것만 
            .map(line => { // 라인 하나씩 가져와서 ,로 나눔 
                const cols = line.split(",");
                return {
                    year: Number(cols[0]),
                    author: cols[1].trim(),
                    count: Number(cols[2]),
                };
            });
        drawChart(data); // <-- 오늘 추가하는 부분
    });

function drawChart(rows) {
    const labels = rows.map(r => r.author);
    const counts = rows.map(r => r.count);

    const canvas = document.querySelector("#poems-chart");
    new Chart(canvas, {
        type: "bar",
        data: {
             labels: labels,
             datasets: [{ label: "작품 편수", data: counts,
                backgroundColor: [
                    "rgba(255,99,132,0.6)",
                    "rgba(54,162,235,0.6)",
                    "rgba(255,206,86,0.6)",
                    "rgba(75,192,192,0.6)"
                ]
              }],
        },
        options: {
            plugins: {
                title: { display: true, text: "작가별 작품 편수"},
                legend: {display: true},
            },
            scales: {
                y: {beginAtZero: true, title: {display: true, text: "편수"}},
                x: {                   title: {display: true, text: "작가"}}
            },
        },
    });
}
 


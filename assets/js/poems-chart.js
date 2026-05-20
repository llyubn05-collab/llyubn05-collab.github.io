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
            datasets: [{label: "작품 편수", data: counts}]
        },
    });
}
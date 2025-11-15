
// FOOTER DYNAMIC CONTENT

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("modified").textContent = document.lastModified;

// WIND CHILL CALCULATION
function calculateWindChill(temp, speed) {
    if (temp <= 50 && speed > 3) {
        return (
            35.74 +
            0.6215 * temp -
            35.75 * Math.pow(speed, 0.16) +
            0.4275 * temp * Math.pow(speed, 0.16)
        ).toFixed(1);
    }
    return "N/A";
}

const temperature = parseFloat(document.getElementById("temp").textContent);
const windSpeed = parseFloat(document.getElementById("speed").textContent);

document.getElementById("windchill").textContent = calculateWindChill(
    temperature,
    windSpeed
);

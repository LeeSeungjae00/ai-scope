const titleMap = {
    "EGC" : "Early gastric cancer",
    "AGC" : "Advanced gastric cancer",
    "BGU" : "Benign gastric cancer"
}


export default function madeSideContent(result) {
    if (result.length < 3) return [];
    const resultArray = [];

    result.sort((a, b) => b[Object.keys(b)].value - a[Object.keys(a)].value);

    console.log()

    resultArray.push({
        title: "Differential diganosis",
        mainValue: `${titleMap[Object.keys(result[0])[0]]} : ${result[0][Object.keys(result[0])].value}%`,
        subValue: [
            `${titleMap[Object.keys(result[1])[0]]} : ${result[1][Object.keys(result[1])].value}%`,
            `${titleMap[Object.keys(result[2])[0]]} : ${result[2][Object.keys(result[2])].value}%`
        ]
    })

    console.log(Object.keys(result[0])[0]);

    if (Object.keys(result[0])[0]=== "EGC") {
        const { T1a, T1b } = result[0]["EGC"].depth;

        resultArray.push({
            title: "Depth of invasion in Early gastric cancer",
            mainValue: `${T1a > T1b ?
                "T1a : " + T1a + "%" :
                "T1b : " + T1b + "%"}`,
            subValue: [`${T1a < T1b ?
                "T1a : " + T1a + "%" :
                "T1b : " + T1b + "%"}`]
        })
    }


    return resultArray
}
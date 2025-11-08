const fromCurrencySelect = document.getElementById("fromCurrency");
const toCurrencySelect = document.getElementById("toCurrency");

// 貨幣代碼和中文國家名的映射關係
const currencyNames = {
  USD: "美元",
  JPY: "日圓",
  KRW: "韓國元",
  TWD: "新台幣",
  CNY: "人民幣",
  EUR: "歐元",
  GBP: "英鎊",
  HKD: "港幣",
  MYR: "馬來西亞林吉特",
};

// 定義全局變數 rates
let rates;

// 從 API 取得貨幣匯率的函數
async function fetchCurrencyRates() {
  const fromCurrencySelect = document.getElementById("fromCurrency");
  const toCurrencySelect = document.getElementById("toCurrency");

  try {
    const response = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await response.json();
    rates = data.rates; 
    
    fromCurrencySelect.innerHTML = "";
    toCurrencySelect.innerHTML = "";

    for (const currency in rates) {
      if (currency in currencyNames) {
        const option = document.createElement("option");
        option.value = currency;
        option.textContent = `${currency} (${currencyNames[currency]})`;
        fromCurrencySelect.appendChild(option.cloneNode(true));
        toCurrencySelect.appendChild(option);
      }
    }
  } catch (error) {
    console.error("Error fetching currency rates:", error);
    alert("Error fetching currency rates. Please try again later.");
  }
}

// 貨幣兌換功能
async function convert() {
  const amount = document.getElementById("amount").value;
  const fromCurrencySelect = document.getElementById("fromCurrency");
  const toCurrencySelect = document.getElementById("toCurrency");
  const fromCurrency = fromCurrencySelect.value;
  const toCurrency = toCurrencySelect.value;

  try {
    // 檢查 rates 是否存在
    if (!rates) {
      throw new Error("Currency rates not available.");
    }
    
    // 從全局 rates 變數中獲取匯率
    const rate = rates[toCurrency] / rates[fromCurrency];

    if (!rate) {
      throw new Error("Invalid currency pair.");
    }

    const convertedAmount = amount * rate;
    document.getElementById("result").innerText = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
  } catch (error) {
    console.error("Error converting currency:", error);
    alert("Error converting currency. Please try again later.");
  }
}

// 貨幣交換功能
function exchangeCurrencies() {
  const fromCurrencySelect = document.getElementById("fromCurrency");
  const toCurrencySelect = document.getElementById("toCurrency");
  const temp = fromCurrencySelect.value;
  fromCurrencySelect.value = toCurrencySelect.value;
  toCurrencySelect.value = temp;
}

// 頁面載入時取得貨幣匯率
window.onload = fetchCurrencyRates;

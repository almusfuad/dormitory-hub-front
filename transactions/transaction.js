const getAllTransactions = () => {
      fetch(`https://dormitory-hub.onrender.com/transactions/all/`, {
            method: 'GET',
      })
      .then((response) => response.json())
      .then((data) => {
            const tableBody = document.getElementById('transactionTableBody');
            data.forEach((transaction) => {
                  const row = document.createElement('tr');
                  row.innerHTML = `
                  <td>${transaction.date}</td>
                  <td>${transaction.description}</td>
                  <td>${transaction.amount}</td>
                  <td>${transaction.balance_after_transaction}</td>
                  `;
                  tableBody.appendChild(row);
            });
      });
};

getAllTransactions();
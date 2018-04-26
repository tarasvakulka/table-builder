export default {
  getTableData: function() {
        let options = {
            method: 'GET'
        };
        return fetch('https://5ae07464ee98370014cf238b.mockapi.io/tabledata', options).then(response => {
            return response.json();
        });
    }
}
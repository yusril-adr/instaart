// Call the dataTables jQuery plugin
$(document).ready(() => {
  $('#dataTable').DataTable({
    language: {
      lengthMenu: 'Menampilkan _MENU_ entri',
      zeroRecords: 'Data masih kosong.',
      info: 'Menampilkan halaman _PAGE_ dari _PAGES_',
      infoEmpty: 'Menampilkan 0 dari 0 entri.',
      infoFiltered: '(filter dari total _MAX_ entri)',
      search: 'Cari:',
      paginate: {
        first: 'Awal',
        last: 'Terakhir',
        next: 'Selanjutnya',
        previous: 'Sebelumnya',
      },
    },
  });
});

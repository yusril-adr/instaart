// Call the dataTables jQuery plugin
$(document).ready(() => {
  $('#dataTable').DataTable({
    language: {
      lengthMenu: 'Menampilkan _MENU_ entri',
      zeroRecords: 'Pencarian tidak ditemukan.',
      info: 'Menampilkan halaman _PAGE_ dari _PAGES_',
      infoEmpty: 'Data masih kosong.',
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

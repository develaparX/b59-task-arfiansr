function deleteProject(projectId) {
  alertify.confirm(
    "Confirm Deletion", // Judul dialog
    "Are you sure you want to delete this project?", // Pesan
    function () {
      // Jika pengguna menekan "OK", redirect ke URL penghapusan
      window.location.href = `/project/delete/${projectId}`;
    },
    function () {
      // Jika pengguna menekan "Cancel", tutup dialog
      alertify.error("Deletion canceled");
    }
  );
}

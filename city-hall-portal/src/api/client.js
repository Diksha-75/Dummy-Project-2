
export const api = {
  async getService(id) {
    const res = await fetch(`http://localhost:5000/api/services/${id}`);
    return res.json();
  },

  async applyService(id, data) {
    const res = await fetch(
      `http://localhost:5000/api/services/${id}/apply`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    return res.json();
  },
};
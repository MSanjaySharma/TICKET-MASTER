export const chartData = (tickets, departments) => {
  const pendingTickets = tickets.filter((ticket) => !ticket.isResolved);
  const high = pendingTickets.filter((ticket) => ticket.priority === "high")
    .length;
  const medium = pendingTickets.filter((ticket) => ticket.priority === "medium")
    .length;
  const low = pendingTickets.filter((ticket) => ticket.priority === "low")
    .length;

  const data1 = [
    ["Priority", "Tickets per Category"],
    ["High", high],
    ["Medium", medium],
    ["Low", low],
  ];

  const options = {
    title: "Ticket Priority",
    pieHole: 0.4,
    is3D: true,
    backgroundColor: "#ad9d9d",
    //backgroundColor: { fill: "transparent" },
  };

  const data2 = [];

  const Header = ["Departments", "Tickets", { role: "style" }];

  data2.push(Header);

  departments.map((dept) => {
    const temp = [];
    temp.push(`${dept.name}`);
    temp.push(
      pendingTickets.filter(
        (ticket) =>
          (ticket.department.name
            ? ticket.department.name
            : this.findDepartment(ticket.department).name) === dept.name
      ).length
    );
    temp.push("blue");
    data2.push(temp);
    return "";
  });

  const allTickets = tickets.length;
  const completedTickets = tickets.filter((ticket) => ticket.isResolved).length;
  const progress = Math.round((completedTickets / allTickets) * 100);

  return { data1, data2, options, progress };
};

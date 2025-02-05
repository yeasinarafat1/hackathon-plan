import Link from "next/link";

export default async function Home() {
  // In real implementation, you might fetch previous complaints from your API
  const previousComplaints = [
    {
      id: 1,
      caseNumber: "CASE-1234",
      status: "In Progress",
      date: "2024-03-15",
    },
    { id: 2, caseNumber: "CASE-5678", status: "Resolved", date: "2024-03-10" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Your Trusted Platform for Efficient Issue Resolution
          </h1>
          <p className="text-xl mb-8">
            Fast, transparent, and user-friendly complaint management system
          </p>
          <Link
            href="/complaint"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
          >
            File a Complaint Now
          </Link>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Platform?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">24/7 Availability</h3>
              <p className="text-gray-600">
                Submit complaints anytime, anywhere through our
                always-accessible platform
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">Real-time Tracking</h3>
              <p className="text-gray-600">
                Monitor your complaint status with live updates and
                notifications
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">Secure & Confidential</h3>
              <p className="text-gray-600">
                Bank-grade security protecting your personal information
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Track Complaints Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h2 className="text-3xl font-bold mb-4 md:mb-0">
              Track Previous Complaints
            </h2>
            <Link
              href="/complaint-history"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Full History
            </Link>
          </div>

          <div className="grid gap-4">
            {previousComplaints.length > 0 ? (
              previousComplaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{complaint.caseNumber}</h3>
                      <p className="text-sm text-gray-500">{complaint.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          complaint.status === "Resolved"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {complaint.status}
                      </span>
                      <Link
                        href={`/complaints/${complaint.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">
                  No previous complaints found
                </p>
                <Link
                  href="/complaint"
                  className="text-blue-600 hover:underline"
                >
                  File your first complaint
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Resolve Your Issue?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied users who have successfully resolved
            their concerns through our platform
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/complaint"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              File a Complaint
            </Link>
            <Link
              href="/faq"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border border-blue-600 hover:bg-blue-50 transition-colors"
            >
              Visit Help Center
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

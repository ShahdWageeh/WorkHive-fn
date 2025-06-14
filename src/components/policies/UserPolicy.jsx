import React from "react";

const UserPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Policy for Clients
      </h1>

      <div className="space-y-8">
        {/* Booking Services */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            1. Booking Services
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>
              Clients can browse and book services based on availability,
              pricing, and professional ratings.
            </li>
            <li>
              All bookings must be confirmed through the Workhive platform.
            </li>
            <li>
              Clients must ensure that the provided address and contact
              information are accurate.
            </li>
          </ul>
        </section>

        {/* Inspection Fee and Service Charges */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            2. Inspection Fee and Service Charges
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>A mandatory inspection fee applies to all home visits.</li>
            <li>
              If the professional resolves the issue during the inspection, the
              fee will be included in the final service cost.
            </li>
            <li>
              If the issue cannot be resolved during the first visit, the client
              is still required to pay the inspection fee.
            </li>
          </ul>
        </section>

        {/* Additional Work Requests */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            3. Additional Work Requests
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>
              If a professional identifies additional issues during service, a
              detailed request will be sent to the client via Workhive.
            </li>
            <li>
              Clients can approve or deny the additional work. Denial means only
              the inspection fee will be charged.
            </li>
          </ul>
        </section>

        {/* Payments */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            4. Payments
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>
              Payment options include cash on delivery, digital wallets, or
              Visa/Mastercard.
            </li>
            <li>
              Payment must be made upon completion of the service or after a
              denied additional work request.
            </li>
          </ul>
        </section>

        {/* Cancellations & No-Shows */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            5. Cancellations & No-Shows
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>
              Clients must cancel appointments at least 4 hours in advance.
            </li>
            <li>
              Repeated no-shows or last-minute cancellations may result in a
              penalty fee or account suspension.
            </li>
          </ul>
        </section>

        {/* Reviews & Ratings */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            6. Reviews & Ratings
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Clients may leave honest reviews based on their experience.</li>
            <li>
              Inappropriate or abusive content in reviews will be removed.
            </li>
          </ul>
        </section>

        {/* Warranty & Support */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            7. Warranty & Support
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>
              Workhive provides a warranty period [e.g., 7–30 days] after
              service completion.
            </li>
            <li>
              Clients can report issues via the live chat for follow-up or
              warranty claims.
            </li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            8. External Dealing Clause
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>
              Any direct dealings between clients and professionals outside the
              Workhive platform are strictly prohibited. If such unauthorized
              interactions occur, Workhive bears no responsibility for the
              outcome, quality, or safety of the work performed. Legal action
              may be taken against the professional involved for breaching
              platform policy.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default UserPolicy;

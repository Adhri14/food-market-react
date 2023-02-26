export default function TabContentOverview({ user }) {
    return (
        <div className="tab-pane fade show active profile-overview" id="profile-overview">

            <h5 className="card-title">Profile Details</h5>

            <div className="row">
                <div className="col-lg-3 col-md-4 label ">Full Name</div>
                <div className="col-lg-9 col-md-8">{user.name}</div>
            </div>

            <div className="row">
                <div className="col-lg-3 col-md-4 label">Role</div>
                <div className="col-lg-9 col-md-8">{user.isAdmin}</div>
            </div>

            <div className="row">
                <div className="col-lg-3 col-md-4 label">email</div>
                <div className="col-lg-9 col-md-8">{user.email}</div>
            </div>

            <div className="row">
                <div className="col-lg-3 col-md-4 label">Phone Number</div>
                <div className="col-lg-9 col-md-8">{user.phoneNumber}</div>
            </div>

            <div className="row">
                <div className="col-lg-3 col-md-4 label">Address</div>
                <div className="col-lg-9 col-md-8">{user.address}</div>
            </div>

            <div className="row">
                <div className="col-lg-3 col-md-4 label">City</div>
                <div className="col-lg-9 col-md-8">{user.city}</div>
            </div>

        </div>
    )
}
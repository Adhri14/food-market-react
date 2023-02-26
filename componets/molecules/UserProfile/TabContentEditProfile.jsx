export default function TabContentEditProfile({ user }) {
    return (
        <div className="tab-pane fade profile-edit pt-3" id="profile-edit">

            {/* <!-- Profile Edit Form --> */}
            <form>
                <div className="row mb-3">
                    <label for="profileImage" className="col-md-4 col-lg-3 col-form-label">Profile Image</label>
                    <div className="col-md-8 col-lg-9">
                        <img src={`${process.env.NEXT_PUBLIC_IMG}/${user.picturePath}`} alt="Profile" />
                        <div className="pt-2">
                            <label htmlFor="profileImg" className="btn btn-primary btn-sm" title="Upload new profile image"><i className="bi bi-upload"></i></label>
                            <input type="file" className="d-none" id="profileImg" />
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <label for="fullName" className="col-md-4 col-lg-3 col-form-label">Full Name</label>
                    <div className="col-md-8 col-lg-9">
                        <input name="fullName" type="text" className="form-control" id="fullName" value="Kevin Anderson" />
                    </div>
                </div>

                <div className="row mb-3">
                    <label for="company" className="col-md-4 col-lg-3 col-form-label">Role</label>
                    <div className="col-md-8 col-lg-9">
                        <input disabled type="text" className="form-control" id="company" value={user.isAdmin} />
                    </div>
                </div>

                <div className="row mb-3">
                    <label for="Email" className="col-md-4 col-lg-3 col-form-label">Email</label>
                    <div className="col-md-8 col-lg-9">
                        <input type="email" className="form-control" id="Email" value={user.email} disabled />
                    </div>
                </div>

                <div className="row mb-3">
                    <label for="houseNumber" className="col-md-4 col-lg-3 col-form-label">House Number</label>
                    <div className="col-md-8 col-lg-9">
                        <input type="text" className="form-control" id="houseNumber" value={user.houseNumber} />
                    </div>
                </div>

                <div className="row mb-3">
                    <label for="City" className="col-md-4 col-lg-3 col-form-label">City</label>
                    <div className="col-md-8 col-lg-9">
                        <input type="text" className="form-control" id="City" value={user.city} />
                    </div>
                </div>

                <div className="row mb-3">
                    <label for="Address" className="col-md-4 col-lg-3 col-form-label">Address</label>
                    <div className="col-md-8 col-lg-9">
                        <input type="text" className="form-control" id="Address" value={user.address} />
                    </div>
                </div>

                <div className="row mb-3">
                    <label for="Phone" className="col-md-4 col-lg-3 col-form-label">Phone</label>
                    <div className="col-md-8 col-lg-9">
                        <input type="number" className="form-control" id="Phone" value={user.phoneNumber} />
                    </div>
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                </div>
            </form>
            {/* <!-- End Profile Edit Form --> */}

        </div>
    )
}
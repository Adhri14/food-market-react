export default function TabContentEditPassword() {
    return (
        <div className="tab-pane fade pt-3" id="profile-change-password">
            {/* <!-- Change Password Form --> */}
            <form>

                <div className="row mb-3">
                    <label for="currentPassword" className="col-md-4 col-lg-3 col-form-label">Current Password</label>
                    <div className="col-md-8 col-lg-9">
                        <input name="password" type="password" className="form-control" id="currentPassword" />
                    </div>
                </div>

                <div className="row mb-3">
                    <label for="newPassword" className="col-md-4 col-lg-3 col-form-label">New Password</label>
                    <div className="col-md-8 col-lg-9">
                        <input name="newpassword" type="password" className="form-control" id="newPassword" />
                    </div>
                </div>

                <div className="row mb-3">
                    <label for="renewPassword" className="col-md-4 col-lg-3 col-form-label">Re-enter New Password</label>
                    <div className="col-md-8 col-lg-9">
                        <input name="renewpassword" type="password" className="form-control" id="renewPassword" />
                    </div>
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Change Password</button>
                </div>
            </form>
            {/* <!-- End Change Password Form --> */}

        </div>
    );
}
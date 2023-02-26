export default function CardProfile({ user }) {
    return (
        <div className="col-xl-4">

            <div className="card">
                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">

                    <img src={`${process.env.NEXT_PUBLIC_IMG}/${user.picturePath}`} alt="Profile" className="rounded-circle" />
                    <h2>{user.name}</h2>
                    <h3>{user.isAdmin}</h3>
                </div>
            </div>

        </div>
    )
}
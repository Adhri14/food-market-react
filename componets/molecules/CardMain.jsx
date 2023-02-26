import { node, number, string } from "prop-types"

export default function CardMain({ children, title, value, containerClassName = 'sales-card' }) {
    return (
        <div className="col-xxl-4 col-md-6">
            <div className={`card info-card ${containerClassName}`}>

                <div className="card-body">
                    <h5 className="card-title">{title}</h5>

                    <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            {/* <i className="bi bi-cart"></i> */}
                            {children}
                        </div>
                        <div className="ps-3">
                            <h6>{value}</h6>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

CardMain.propTypes = {
    children: node,
    title: string,
    value: number,
    containerClassName: string,
}
import PropTypes from 'prop-types';

export default function Alert(props) {
    const { title, className, type, children, description, subtitle } = props;
    if (type === 'with-heading') {
        return (
            <div className={`alert ${className} alert-dismissible fade show`} role="alert">
                <h4 className="alert-heading">{title}</h4>
                <p>{description}</p>
                <hr />
                <p className="mb-0">{subtitle}</p>
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        )
    }
    return (

        // with icon
        // <div class="alert alert-primary alert-dismissible fade show" role="alert">
        //                                 <i class="bi bi-star me-1"></i>
        //                                 A simple primary alert with icon—check it out!
        //                                 <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        //                             </div>

        // outline
        // <div class="alert border-primary alert-dismissible fade show" role="alert">
        //                                 A simple primary outlined alert—check it out!
        //                                 <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        //                             </div>

        // default solid
        // <div class="alert alert-primary bg-primary text-light border-0 alert-dismissible fade show" role="alert">
        //                                 A simple primary alert with solid color—check it out!
        //                                 <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
        //                             </div>
        <div className={`alert ${className} alert-dismissible fade show`} role="alert">
            {children}
            {title}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
}

Alert.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string,
    children: PropTypes.node,
    description: PropTypes.string,
    subtitle: PropTypes.string,
}

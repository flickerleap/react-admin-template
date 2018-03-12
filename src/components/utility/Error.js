const Error = ({errors = []}) => (
    <div className="alert alert-danger" role="alert">
        {
            errors.map((error) => (
                <span>{error}<br/></span>
            ))
        }
    </div>
);
import './Account.css';

const Account = (props) => {
    return (
        <div className='container'>
            <div className="user__account__container">
                <div className="account__container">
                    <div className="account__header">
                        <h1>マイアカウント</h1>
                    </div>
                    <div className="account__page__detail">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;
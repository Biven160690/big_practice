import { Data } from '..';
import { CardWrapper } from '../styles';

export const Card = ({
    avatar_url,
    login,
    followers,
    following,
    public_repos,
    repos,
}: Data) => {
    return (
        <CardWrapper>
            <img className="avatar" src={`${avatar_url}`} />
            <div className="description">
                <h2>{login}</h2>
                <div className="data">
                    <div className="followers">
                        <div className="text">followers</div>
                        <div className="amount">{followers}</div>
                    </div>
                    <div className="following">
                        <div className="text">following</div>
                        <div className="amount">{following}</div>
                    </div>
                    <div className="amountRepos">
                        <div className="text">repos</div>
                        <div className="amount">{public_repos}</div>
                    </div>
                </div>
                <div className="repos">
                    {repos.map((el, index) => (
                        <a href={el.html_url} className="repo" key={index}>
                            {el.name}
                        </a>
                    ))}
                </div>
            </div>
        </CardWrapper>
    );
};

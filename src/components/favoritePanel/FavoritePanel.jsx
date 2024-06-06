
import { Button, List } from 'antd';
import {useFavorite} from '../../contexts/FavoriteContexts'
import { removeFavorite } from '../../api/apiFavs';

const FavoritePanel = () => {
const {favorites,setFavorites}

    return (
        <div>
            <h3>Favoritos</h3>
            <List
                dataSource={favorites}
                renderItem={item => (
                    <List.Item>
                        {item.name}
                        <Button onClick={() => removeFavorite(item.id)}>Eliminar</Button>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default FavoritePanel


import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from 'react-router-dom';

function Cards({pImage,pTitle,pDesc,oPrice,dPrice,id}) {

  const navigate = useNavigate();



  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={pImage} onClick={()=> navigate(`/product/${id}`,{state:true})} />
      <Card.Body>
        <Card.Title>{pTitle}</Card.Title>
        <Card.Text>
          {pDesc}
        </Card.Text>
        <div>
       <h2><del>$500</del></h2> 
          <h2>$400</h2>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Cards;
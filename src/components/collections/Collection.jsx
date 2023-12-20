import { Card, CardHeader, CardBody, Stack, Heading, CardFooter, Button} from "@chakra-ui/react";
import PlaatList from "../../pages/vinyls/VinylList";
import { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { IoTrashOutline, IoPencilOutline } from "react-icons/io5";

export default memo(function Collection({ id, name, onDelete }) {
  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  return (
    <Card
      key={id}
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      data-cy="collection"
    >
      <Stack>
        <CardHeader>
          <Heading as="h2" size="lg" data-cy="collection_heading_name">
            {name}
          </Heading>
        </CardHeader>
        <CardBody>
          <PlaatList colID={id} />
        </CardBody>
        <CardFooter>
          <Button colorScheme="purple">
            <Link to={`/collection/edit/${id}`} data-cy="collection_edit_btn">
              <IoPencilOutline />
            </Link>
          </Button>
          <Button
            data-cy="collection_delete_btn"
            colorScheme="blue"
            onClick={handleDelete}
          >
            <IoTrashOutline />
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
});

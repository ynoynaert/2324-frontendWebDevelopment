import { isAxiosError } from "axios";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
} from "@chakra-ui/react";

export default function Error({ error }) {
  if (isAxiosError(error)) {
    return (
      <Alert
        status="error"
        justifyContent="center"
        margin="auto"
        maxWidth="lg"
        variant="left-accent"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon boxSize='40px' mr={0} />
        <Box>
          <AlertTitle>Something went wrong!</AlertTitle>
          <AlertDescription>
            {error.response?.data?.message || error.message}
            {error.response?.data?.details && (
              <>
                :
                <br />
                {JSON.stringify(error.response.data.details)}
              </>
            )}
          </AlertDescription>
        </Box>
      </Alert>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        <h4 className="alert-heading">An unexpected error occured</h4>
        {error.message || JSON.stringify(error)}
      </div>
    );
  }

  return null;
}

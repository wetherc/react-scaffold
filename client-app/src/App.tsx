import Header from "@cloudscape-design/components/header";
import Container from "@cloudscape-design/components/container";
import ContentLayout from "@cloudscape-design/components/content-layout";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Link from "@cloudscape-design/components/link";
import { useQuery, gql } from '@apollo/client';

const GET_BOOKS = gql`
  query ListBooks {
    listBooks {
      author {
        lastName
        firstName
      }
      publicationDate
      title
    }
  }
`;

function GetBooks() {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.listBooks.map(({ title, publicationDate, author }) => (
    <ol>
      <li>{title}</li>
      <li>{publicationDate}</li>
      <li>{author.lastName}, {author.firstName}</li>
    </ol>
  ));
}

export default function App() {
  return (
    <ContentLayout
      header={
        <SpaceBetween size="m">
          <Header
            variant="h1"
            info={<Link>Info</Link>}
            description="This is a generic library of some Sci-Fi authors and their works."
          >
            Sci-Fi Library
          </Header>
        </SpaceBetween>
      }
    >
      <Container
        header={
          <Header
            variant="h2"
            description="A selection of currently available books"
          >
            Selected Titles
          </Header>
        }
      >
        <GetBooks />
      </Container>
    </ContentLayout>
  );
}
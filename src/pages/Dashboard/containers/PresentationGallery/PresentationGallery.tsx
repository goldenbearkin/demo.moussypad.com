import * as React from 'react';

// UI
import { GridList, GridTile } from 'material-ui/GridList';
import Loading from '../../../../components/Loading/Loading';
import PresentationCard from './components/PresentationCard/PresentationCard';

type PresentationT = {
  presentationId: string;
  thumbnailURL: string;
};

type PropsT = {
  style?: React.CSSProperties;
};

type StateT = {
  presentations: PresentationT[];
};

class PresentationGallery extends React.Component<PropsT, StateT> {
  constructor(props: PropsT) {
    super(props);
    this.state = {
      presentations: []
    };
  }

  componentDidMount() {
    gapi.client.request(
      {
        path: 'drive/v3/files',
        params: {
          q: 'mimeType = \'application/vnd.google-apps.presentation\' and trashed = false',
          fields: 'files/id'
        }
      })
      .then((resp1) => {
        const files = resp1.result.files;
        let tmp: PresentationT[] = [];
        // tslint:disable-next-line:no-any
        files.map((file: any) => {
          gapi.client.request(
            {
              path: `https://slides.googleapis.com/v1/presentations/${file.id}`
            })
            .then(resp2 => {
              const presentation = resp2.result;
              const presentationId = presentation.presentationId;
              const firstPageId = presentation.slides[0].objectId;
              gapi.client.request(
                {
                  path: `https://slides.googleapis.com/v1/presentations/${presentationId}/pages/${firstPageId}/thumbnail`
                  + `?thumbnailProperties.thumbnailSize=LARGE`
                  + `&thumbnailProperties.mimeType=PNG`
                })
                .then(resp3 => {
                  const thumbnailURL = resp3.result.contentUrl;
                  // tmp.push({ presentationId, thumbnailURL });
                  tmp = [{ presentationId, thumbnailURL }, ...tmp];
                  if (files.length === tmp.length) {
                    this.setState({
                      presentations: tmp
                    });
                  }
                });
            });
        });
      });
  }

  render() {
    const presentations = this.state.presentations;
    if (presentations.length === 0) {
      return (
        <Loading />
      );
    }
    const display = presentations.map(presentation => (
      <GridTile
        key={presentation.presentationId}
        style={{ padding: 2 }}
        containerElement={<PresentationCard thumbnailURL={presentation.thumbnailURL} />}
      />
    ));
    return (
      <div style={this.props.style}>
        <GridList
          cellHeight={'auto'}
          cols={4}
          padding={10}
        >
          {display}
        </ GridList>
      </div>
    );
  }
}

export default PresentationGallery;
import { SiteHeader, SectionContainer, SectionWrapper } from "./styles";
import { TitleProps } from "./types";

const Title = ({ title }: TitleProps) => (
    <SectionWrapper>
        <SectionContainer>
            <SiteHeader>{title}</SiteHeader>
        </SectionContainer>
    </SectionWrapper>
);

export default Title;